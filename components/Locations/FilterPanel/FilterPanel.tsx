"use client";

import css from "./FilterPanel.module.css";
import { getLocationTypes, getRegions } from "@/lib/locationsApi";
import Select, {
  components,
  type OptionProps,
  type StylesConfig,
} from "react-select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterPanelProps {
  region: string | undefined;
  locationType: string | undefined;
  sort: string | undefined;
}

interface LocationTypeOption {
  value: string;
  label: string;
}

function CheckboxOption(props: OptionProps<LocationTypeOption, true>) {
  return (
    <components.Option {...props}>
      <span className={css.typeOption}>
        <input
          className={css.typeCheckbox}
          type="checkbox"
          checked={props.isSelected}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
        />
        {props.children}
      </span>
    </components.Option>
  );
}

const locationTypeSelectStyles: StylesConfig<LocationTypeOption, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: "var(--location-type-select-height)",
    border: "1px solid rgba(76, 38, 19, 0.14)",
    borderColor: state.isFocused
      ? "var(--color-coral-dark)"
      : "rgba(76, 38, 19, 0.14)",
    borderRadius: 6,
    backgroundColor: "var(--color-coral-lighter)",
    boxShadow: "none",
    fontFamily: "inherit",
    fontSize: 14,
    outline: state.isFocused ? "2px solid var(--color-coral-dark)" : "none",
    outlineOffset: 2,
    "&:hover": {
      borderColor: "rgba(76, 38, 19, 0.3)",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    minWidth: 0,
    padding: "var(--location-type-value-padding)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-coral-darkest)",
  }),
  multiValue: (base) => ({
    ...base,
    maxWidth: 140,
    borderRadius: 4,
    backgroundColor: "rgba(76, 38, 19, 0.1)",
  }),
  multiValueLabel: (base) => ({
    ...base,
    overflow: "hidden",
    color: "var(--color-coral-darkest)",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--color-coral-darkest)",
    borderRadius: "0 4px 4px 0",
    "&:hover": {
      backgroundColor: "rgba(76, 38, 19, 0.15)",
      color: "var(--color-coral-darkest)",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 5,
    backgroundColor: "var(--color-coral-lighter)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--color-coral-light)"
      : state.isFocused
        ? "var(--color-coral-lightest)"
        : "var(--color-coral-lighter)",
    color: "var(--color-coral-darkest)",
    cursor: "pointer",
  }),
};

export default function FilterPanel({
  region,
  locationType,
  sort,
}: FilterPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTypes = (searchParams.get("locationType") ?? locationType ?? "")
    .split(",")
    .filter(Boolean);

  const updateUrlFilter = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    nextParams.delete("page");
    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const {
    data: regions = [],
    isPending: isRegionsPending,
    error: regionsError,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  const {
    data: locationTypes = [],
    isPending: isLocationTypesPending,
    error: locationTypesError,
  } = useQuery({
    queryKey: ["locationTypes"],
    queryFn: getLocationTypes,
  });

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const handleSearch = useDebouncedCallback((search: string) => {
    updateUrlFilter("search", search.trim());
  }, 1000);

  const handleRegionChange = (value: string) => {
    updateUrlFilter("region", value);
  };

  const handleSortChange = (value: string) => {
    updateUrlFilter("sort", value);
  };

  return (
    <div className={css.panel}>
      <input
        className={css.searchInput}
        autoComplete="off"
        type="text"
        name="query"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          handleSearch(event.target.value);
        }}
        placeholder="Пошук"
        aria-label="Пошук"
      />
      <div className={css.filterRow}>
        <div className={css.control}>
          <label htmlFor="locationType">Тип локації</label>
          <Select<LocationTypeOption, true>
            inputId="locationType"
            className={css.typeSelect}
            classNamePrefix="locationTypeSelect"
            styles={locationTypeSelectStyles}
            options={locationTypes.map((type) => ({
              value: type.slug,
              label: type.type,
            }))}
            value={locationTypes
              .filter((type) => selectedTypes.includes(type.slug))
              .map((type) => ({ value: type.slug, label: type.type }))}
            onChange={(options) =>
              updateUrlFilter(
                "locationType",
                options.map((option) => option.value).join(","),
              )
            }
            components={{ Option: CheckboxOption }}
            isMulti
            isClearable
            isLoading={isLocationTypesPending}
            isDisabled={isLocationTypesPending || !!locationTypesError}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            placeholder="Тип локації"
            noOptionsMessage={() => "Типи локацій не знайдено"}
          />
          {locationTypesError && <p>Не вдалося завантажити типи локацій.</p>}
        </div>

        <div className={css.control}>
          <label htmlFor="region">Регіон</label>
          <select
            id="region"
            value={searchParams.get("region") ?? region ?? ""}
            onChange={(event) => handleRegionChange(event.target.value)}
          >
            <option value="">Регіон</option>
            {isRegionsPending && (
              <option value="" disabled>
                Завантаження регіонів...
              </option>
            )}
            {regions.map((region) => (
              <option key={region._id} value={region.slug}>
                {region.region}
              </option>
            ))}
          </select>
          {regionsError && <p>Не вдалося завантажити регіони.</p>}
        </div>
      </div>
      <div className={`${css.control} ${css.sortControl}`}>
        <label htmlFor="sort">Сортування</label>
        <select
          id="sort"
          value={searchParams.get("sort") ?? sort ?? "popular"}
          onChange={(event) => handleSortChange(event.target.value)}
        >
          <option value="popular">Сортування</option>
          <option value="popular">За популярністю</option>
          <option value="rating">За рейтингом</option>
          <option value="newest">Новіші спочатку</option>
        </select>
      </div>
    </div>
  );
}
