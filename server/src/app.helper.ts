import QueryString from 'qs';

export const hasPagination = (pageCount) => {
  return pageCount !== undefined && pageCount > 1;
};
const pathUrl = (path, query, page) => {
  query.page = page;

  return `${path}?${QueryString.stringify(query)}`;
};

export const previous = (page, path, query) => {
  page = parseInt(page);
  return {
    path: pathUrl(path, query, page - 1),
    class: page === undefined || page <= 1 ? 'pointer-events-none' : null,
  };
};

export const next = (page, pageCount, path, query) => {
  page = parseInt(page);
  return {
    path: pathUrl(path, query, page + 1),
    class: parseInt(page) >= pageCount ? 'pointer-events-none' : null,
  };
};

export const pagy = (currentPage, pageCount, path, query) => {
  const pages = [];
  const offset = 2;
  const pageFirst = 1;
  currentPage = parseInt(currentPage);
  for (
    let index = currentPage - offset; // bắt đầu từ current page trở về trước, lấy ở trang thứ 2
    index <= currentPage + offset; // bắt đầu từ current page trở về sau, lấy trang thứ 2
    index++
  ) {
    if (pageFirst < index && index < pageCount) {
      // chỗ này là để lấy vị trị 5 trang cần show ra ở view
      // và check không cho hiện ra số âm và vượt quá pageCount
      pages.push(index);
    }
  }
  if (pages[0] > offset) pages.unshift(null); // nếu từ vị trí đầu của page show lớn hơn 2 thì thêm null vào đầu, và bên view ta sẽ check nếu null thì sẽ thêm `...` vào
  if (pages[pages.length - 1] <= pageCount - offset) pages.push(null); // tương tự như trên nhưng ở phía ngược lại, ta thêm ở cuối
  pages.unshift(1); // thêm page 1 vào đầu
  pages.push(pageCount); // thêm page cuối vào cuối
  // cuối cùng là return lại các object
  return pages.map((page) =>
    page === null
      ? { dot: true } // check dưới view có show `...`
      : {
          page,
          path: pathUrl(path, query, page),
          class:
            page === currentPage
              ? 'bg-blue-500 bg-opacity-50 pointer-events-none'
              : null,
        },
  );
};
