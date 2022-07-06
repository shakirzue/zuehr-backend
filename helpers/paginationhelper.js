exports.getPaginationInfo = (pageIndex, size, totalCount) => {
    return {
      page: pageIndex,
      limit: size,
      totalCount: totalCount
    };
  };