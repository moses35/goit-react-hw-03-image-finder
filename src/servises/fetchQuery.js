export async function fetchQuery(query, page) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=35693729-7199fec9e2a2b3b9c97a93780&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error('error'));
}
