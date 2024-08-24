import React from 'react';
import StoryList from './StoryList';
import SearchBar from './SearchBar';
import { useQuery } from '@tanstack/react-query';

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNewsApp = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredStories = data?.hits.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hacker News Top 100 Stories</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StoryList stories={filteredStories} isLoading={isLoading} />
    </div>
  );
};

export default HackerNewsApp;