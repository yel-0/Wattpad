import { Checkbox } from "@/components/ui/checkbox";

export function SearchFilters() {
  return (
    <div className="w-64 p-4">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">"my hero"</h3>
        <p className="text-sm text-gray-500">231K results</p>
      </div>

      {/* Length Filter */}
      <div className="mb-6">
        <h4 className="mb-3 font-medium">Length</h4>
        <p className="mb-2 text-xs text-gray-500">
          You can select multiple options
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="any" checked />
            <label htmlFor="any" className="text-sm">
              Any Length
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="1-10" />
            <label htmlFor="1-10" className="text-sm">
              1 - 10 Parts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="10-20" />
            <label htmlFor="10-20" className="text-sm">
              10 - 20 Parts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="20-50" />
            <label htmlFor="20-50" className="text-sm">
              20 - 50 Parts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="50+" />
            <label htmlFor="50+" className="text-sm">
              50 Parts or more
            </label>
          </div>
        </div>
      </div>

      {/* Last Updated Filter */}
      <div className="mb-6">
        <h4 className="mb-3 font-medium">Last Updated</h4>
        <p className="mb-2 text-xs text-gray-500">
          You can select multiple options
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="anytime" checked />
            <label htmlFor="anytime" className="text-sm">
              Anytime
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="today" />
            <label htmlFor="today" className="text-sm">
              Today
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="this-week" />
            <label htmlFor="this-week" className="text-sm">
              This Week
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="this-month" />
            <label htmlFor="this-month" className="text-sm">
              This Month
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="this-year" />
            <label htmlFor="this-year" className="text-sm">
              This Year
            </label>
          </div>
        </div>
      </div>

      {/* Content Filter */}
      <div className="mb-6">
        <h4 className="mb-3 font-medium">Content</h4>
        <p className="mb-2 text-xs text-gray-500">
          You can select multiple options
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="completed" />
            <label htmlFor="completed" className="text-sm">
              Only Show Completed Stories
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hide-originals" />
            <label htmlFor="hide-originals" className="text-sm">
              Hide Wattpad Originals
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
