import React from 'react';
import StoryItem from './StoryItem';
import SkeletonStory from './SkeletonStory';

const StoryList = ({ stories, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <SkeletonStory key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stories?.map(story => (
        <StoryItem key={story.objectID} story={story} />
      ))}
    </div>
  );
};

export default StoryList;