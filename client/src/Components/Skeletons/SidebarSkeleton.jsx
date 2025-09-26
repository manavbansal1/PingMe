import '../../CSS/Skeletons.css';

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <div className="sidebar-skeleton">
      {/* Header */}
      <div className="sidebar-skeleton-header">
        <div className="skeleton-header-content">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-title"></div>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="skeleton-contacts">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="skeleton-contact">
            {/* Avatar skeleton */}
            <div className="skeleton skeleton-contact-avatar"></div>

            {/* User info skeleton */}
            <div className="skeleton-contact-info">
              <div className="skeleton skeleton-contact-name"></div>
              <div className="skeleton skeleton-contact-status"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;