import ContentCard from './ContentCard';

export default function ContentGrid({ contents }) {
  // Function to format date in a readable way
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {contents.map((content) => (
        <ContentCard 
          key={content.id}
          id={content.id}
          title={content.title}
          type={content.type}
          views={content.views}
          date={formatDate(content.createdAt)}
          platforms={content.platforms}
          fileSize={content.fileSize}
          status={content.status}
        />
      ))}
    </div>
  );
}
