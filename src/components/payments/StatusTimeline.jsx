import { CheckCircle, Clock, Loader2, XCircle, AlertTriangle } from 'lucide-react';

const statusIcons = {
  requested: Clock,
  approved: CheckCircle,
  processing: Loader2,
  completed: CheckCircle,
  failed: XCircle,
  rejected: XCircle,
  cancelled: XCircle,
  pending: Clock,
  submitted: Clock,
  viewed: Clock,
  flagged: AlertTriangle,
};

const statusColors = {
  requested: 'text-gray-500 bg-gray-100',
  approved: 'text-green-600 bg-green-100',
  processing: 'text-blue-600 bg-blue-100',
  completed: 'text-green-600 bg-green-100',
  failed: 'text-red-600 bg-red-100',
  rejected: 'text-red-600 bg-red-100',
  cancelled: 'text-gray-600 bg-gray-100',
  pending: 'text-yellow-600 bg-yellow-100',
  submitted: 'text-blue-600 bg-blue-100',
  viewed: 'text-blue-600 bg-blue-100',
  flagged: 'text-orange-600 bg-orange-100',
};

const lineColors = {
  requested: 'bg-gray-300',
  approved: 'bg-green-500',
  processing: 'bg-blue-500',
  completed: 'bg-green-500',
  failed: 'bg-red-500',
  rejected: 'bg-red-500',
  cancelled: 'bg-gray-400',
  pending: 'bg-yellow-500',
  submitted: 'bg-blue-500',
  viewed: 'bg-blue-500',
  flagged: 'bg-orange-500',
};

const StatusTimeline = ({ events, orientation = 'vertical' }) => {
  if (!events || events.length === 0) return null;

  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center justify-between w-full overflow-x-auto py-2">
        {events.map((event, index) => {
          const Icon = statusIcons[event.status?.toLowerCase()] || Clock;
          const colorClass = statusColors[event.status?.toLowerCase()] || statusColors.pending;
          const lineColor = lineColors[event.status?.toLowerCase()] || lineColors.pending;
          const isLast = index === events.length - 1;

          return (
            <div key={index} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon className={`w-4 h-4 ${event.status === 'processing' ? 'animate-spin' : ''}`} />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-900 capitalize whitespace-nowrap">
                    {event.status}
                  </p>
                  {event.date && (
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              {!isLast && (
                <div className={`h-0.5 flex-1 mx-2 ${lineColor}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, index) => {
          const Icon = statusIcons[event.status?.toLowerCase()] || Clock;
          const colorClass = statusColors[event.status?.toLowerCase()] || statusColors.pending;
          const lineColor = lineColors[event.status?.toLowerCase()] || lineColors.pending;
          const isLast = index === events.length - 1;

          return (
            <li key={index}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className={`absolute left-4 top-4 -ml-px h-full w-0.5 ${lineColor}`}
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${colorClass}`}>
                      <Icon className={`w-4 h-4 ${event.status === 'processing' ? 'animate-spin' : ''}`} />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {event.status}
                      </p>
                      {event.user && (
                        <p className="text-xs text-gray-500">
                          by {event.user}
                        </p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-xs text-gray-500">
                      {event.date && (
                        <>
                          <p>{new Date(event.date).toLocaleDateString()}</p>
                          <p>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatusTimeline;
