import { useState } from 'react';

interface ITable {
  columns: { label: string; value: string }[];
  data: any[];
  onSelect: (index: number) => void;
}

export function Table({ columns, data, onSelect: handleSelect }: ITable) {
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (index: number) => {
    handleSelect(index);
    setActive(index);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -mx-8">
        <div className="py-2 inline-block min-w-full px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border border-gray-100">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    #
                  </th>
                  {columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, itemIndex: number) => (
                  <tr
                    key={itemIndex}
                    className={`cursor-pointer ${
                      itemIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white border-b'
                    } ${
                      active === itemIndex
                        ? 'bg-blue-900 text-white'
                        : 'hover:bg-blue-300 text-gray-900'
                    }`}
                    onClick={() => handleClick(itemIndex)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {itemIndex + 1}
                    </td>
                    {columns.map((column, columnIndex) => (
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        key={columnIndex}
                      >
                        {item[column.value]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
