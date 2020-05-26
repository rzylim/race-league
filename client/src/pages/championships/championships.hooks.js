import { useState } from "react";

// custom hook for filter state
export const useFilterState = (initialState) => {
  const [filterSelection, setFilter] = useState(initialState);

  const handleSeriesChange = (event) => {
    setFilter({
      ...filterSelection,
      series: {
        ...filterSelection.series,
        [event.target.name]: event.target.checked,
      },
    });
  };
  const handleRegionChange = (event) => {
    setFilter({
      ...filterSelection,
      region: {
        ...filterSelection.region,
        [event.target.name]: event.target.checked,
      },
    });
  };
  const handleTierChange = (event) => {
    setFilter({
      ...filterSelection,
      tier: {
        ...filterSelection.tier,
        [event.target.name]: event.target.checked,
      },
    });
  };
  const handleGameChange = (event) => {
    setFilter({
      ...filterSelection,
      game: {
        ...filterSelection.game,
        [event.target.name]: event.target.checked,
      },
    });
  };
  const handleSearchChange = (event) => {
    setFilter({
      ...filterSelection,
      search: event.target.value,
    });
  };

  return {
    selection: {
      all: filterSelection,
      series: filterSelection.series,
      region: filterSelection.region,
      tier: filterSelection.tier,
      game: filterSelection.game,
      search: filterSelection.search,
    },
    setFilter,
    handleChange: {
      series: handleSeriesChange,
      region: handleRegionChange,
      tier: handleTierChange,
      game: handleGameChange,
      search: handleSearchChange,
    },
  };
};
