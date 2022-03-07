import { convertUnixToDate, truncateHash } from '../utils';

const Table = ({data}: any) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Hash
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Block Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Transactions
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Eth Transfered
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {truncateHash(data?.hash)
                ? truncateHash(data.hash)
                : "No hash info"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data?.number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {/* {renderTransactions()} */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {convertUnixToDate(data?.timestamp)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {/* ETH {hashTotalValue ? hashTotalValue : "0"}{" "} */}
            </td>
          </tr>
        </tbody>
      </table>
  )
}

export default Table