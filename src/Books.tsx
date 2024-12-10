import React, { useState } from "react";
import { Pagination } from "flowbite-react";

const BookList = ({ bestSellers }) => {
  const { num_results: totalBooks, results } = bestSellers;
  const bookList = results?.lists?.flatMap((books) => books.books) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const totalPages = Math.ceil(totalBooks / pageSize) || 1;
  const pagedBookList = bookList.slice(firstIndex, lastIndex);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pagedBookList.map(
          (
            {
              id,
              author,
              amazon_product_url,
              book_image: coverImage,
              title,
              description,
            },
            index,
          ) => (
            <div
              key={id + title.replace(" ", "_")}
              className="m-6 max-w-sm overflow-hidden rounded shadow-lg"
            >
              <img className="w-full" src={coverImage} alt={title} />
              <div className="px-6 py-4">
                <div className="mb-2 text-xl font-bold">{title}</div>
                <p className="text-base text-gray-700">{author}</p>
              </div>
              <div className="px-6 py-4">
                <a
                  href={amazon_product_url}
                  className="inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                  Buy
                </a>
              </div>
            </div>
          ),
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        layout={"pagination"}
      />
    </div>
  );
};

const MemoizedBookList = React.memo(BookList);

export default MemoizedBookList;
