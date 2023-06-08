import PropTypes from 'prop-types';
import { Component } from 'react';
import { fetchQuery } from 'servises/fetchQuery';
import { toast } from 'react-toastify';
import { Gallery } from 'components/ImageGallery/imageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    hiddenLoadMore: false,
    totalCount: 0,
    openModal: false,
    modalInfo: { img: null, tags: '' },
    isLoaded: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.reset();
    }
    if (
      prevProps.search !== this.props.search ||
      prevState.page !== this.state.page
    ) {
      fetchQuery(this.props.search, this.state.page)
        .then(response => {
          if (response.hits.length === 0) {
            throw new Error();
          }

          this.setState(
            prevState => ({
              isLoaded: true,
              pictures: [...prevState.pictures, ...response.hits],
              hiddenLoadMore: true,
              totalCount: prevState.totalCount + 12,
            }),
            () => {
              if (response.totalHits <= this.state.totalCount) {
                this.setState({ hiddenLoadMore: false });
                toast.error(
                  `We're sorry, but you've reached the end of search results.`
                );
              }
            }
          );
        })
        .catch(() => {
          toast.error('Nothing found');
        })
        .finally(() => {
          this.setState({ isLoaded: false });
        });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoaded: true,
      hiddenLoadMore: false,
    }));
  };

  reset = () => {
    this.setState({
      pictures: [],
      page: 1,
      hiddenLoadMore: false,
      totalCount: 0,
      openModal: false,
      modalInfo: { img: null, tags: '' },
      isLoaded: true,
    });
  };

  modalOpen = (largeImageUrl, tags) => {
    this.setState({
      openModal: true,
      modalInfo: { img: largeImageUrl, tags: tags },
    });
  };

  modalClose = () => {
    this.setState({
      openModal: false,
    });
  };

  render() {
    const { pictures } = this.state;

    return (
      <>
        <Gallery>
          {[pictures.length] &&
            pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                showModal={this.modalOpen}
              />
            ))}
        </Gallery>
        {this.state.isLoaded && <Loader />}
        {this.state.hiddenLoadMore && <Button loadMore={this.loadMore} />}
        {this.state.openModal && (
          <Modal imageUrl={this.state.modalInfo} closeModal={this.modalClose} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
};
