import { useState } from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';

const presetRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last7days' },
  { label: 'Last 30 days', value: 'last30days' },
  { label: 'This month', value: 'thisMonth' },
  { label: 'Last month', value: 'lastMonth' },
  { label: 'This year', value: 'thisYear' },
  { label: 'Custom', value: 'custom' },
];

const getDateRange = (preset) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (preset) {
    case 'today':
      return { start: today, end: today };
    case 'yesterday': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { start: yesterday, end: yesterday };
    }
    case 'last7days': {
      const start = new Date(today);
      start.setDate(start.getDate() - 6);
      return { start, end: today };
    }
    case 'last30days': {
      const start = new Date(today);
      start.setDate(start.getDate() - 29);
      return { start, end: today };
    }
    case 'thisMonth':
      return { 
        start: new Date(now.getFullYear(), now.getMonth(), 1), 
        end: today 
      };
    case 'lastMonth': {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { start, end };
    }
    case 'thisYear':
      return { 
        start: new Date(now.getFullYear(), 0, 1), 
        end: today 
      };
    default:
      return { start: null, end: null };
  }
};

const DateRangePicker = ({ 
  value, 
  onChange, 
  showPresets = true,
  showCompare = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('last30days');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset);
    if (preset !== 'custom') {
      const range = getDateRange(preset);
      onChange?.(range);
      setIsOpen(false);
    }
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onChange?.({
        start: new Date(customStart),
        end: new Date(customEnd)
      });
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSelectedPreset('last30days');
    setCustomStart('');
    setCustomEnd('');
    onChange?.(getDateRange('last30days'));
  };

  const formatDisplayDate = () => {
    if (selectedPreset === 'custom' && customStart && customEnd) {
      return `${new Date(customStart).toLocaleDateString()} - ${new Date(customEnd).toLocaleDateString()}`;
    }
    const range = getDateRange(selectedPreset);
    if (range.start && range.end) {
      if (range.start.getTime() === range.end.getTime()) {
        return range.start.toLocaleDateString();
      }
      return `${range.start.toLocaleDateString()} - ${range.end.toLocaleDateString()}`;
    }
    return 'Select date range';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span>{formatDisplayDate()}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {showPresets && (
              <div className="p-3 border-b border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  {presetRanges.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => handlePresetClick(preset.value)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedPreset === preset.value
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedPreset === 'custom' && (
              <div className="p-3 border-b border-gray-100">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button
                    onClick={handleCustomApply}
                    disabled={!customStart || !customEnd}
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            <div className="p-3 flex justify-end">
              <button
                onClick={handleClear}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
