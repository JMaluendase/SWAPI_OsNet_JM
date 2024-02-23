import React from "react";

interface PaginationProps {
  prevPage: string | null;
  nextPage: string | null;
  fetchData: (url: string) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ prevPage, nextPage, fetchData }) => {
  return (
    <section className="section_pagination">
      <div className="container_pagination">
        {prevPage && (
          <figure
            className="pagination_left"
            onClick={() => fetchData(prevPage)}
          >
          </figure>
        )}
        {nextPage && (
          <figure
            className="pagination_right"
            onClick={() => fetchData(nextPage)}
          >
          </figure>
        )}
      </div>
    </section>
  );
};

export default PaginationComponent;
