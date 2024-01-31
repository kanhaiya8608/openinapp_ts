import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { MdClose } from "react-icons/md";

const DataTable = ({ data }) => {
  const [selectedTags, setSelectedTags] = useState({});

  const handleTagChange = (row, selectedTag) => {
    setSelectedTags((prevSelectedTags) => {
      const existingTags = prevSelectedTags[row.id] || [];
      if (!existingTags.includes(selectedTag)) {
        return {
          ...prevSelectedTags,
          [row.id]: [...existingTags, selectedTag],
        };
      }
      return prevSelectedTags;
    });
  };

  const handleRemoveTag = (row, tagToRemove) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = (prevSelectedTags[row.id] || []).filter(
        (tag) => tag !== tagToRemove
      );
      return {
        ...prevSelectedTags,
        [row.id]: updatedTags,
      };
    });
  };

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id', width: 100 },
      { Header: 'Links', accessor: 'links', width: 200 },
      {
        Header: 'Select Tags',
        accessor: 'select tags',
        Cell: ({ row }) => {
          const tags = row.original['select tags']
            .split(',')
            .map((tag) => tag.trim());
          const selectedTagsForRow = selectedTags[row.id] || [];

          return (
            <div className="flex items-center">
              <select
                className="p-2 border rounded"
                value=""
                onChange={(e) => handleTagChange(row, e.target.value)}
              >
                <option className='bg-white rounded-md' value="" disabled>
                  Select tags
                </option>
                {tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          );
        },
        width: 300,
      },
      {
        Header: 'Selected Tags',
        accessor: 'selected tags',
        Cell: ({ row }) => {
          const selectedTagsForRow = selectedTags[row.id] || [];
          return (
            <div className="flex items-baseline justify-between align-items-center text-white">
              {selectedTagsForRow.map((tag, index) => (
                <span key={index} className="flex flex-row mr-2 bg-indigo-500 rounded-md p-2 capitalize">
                  {tag}{' '}
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveTag(row, tag)}
                  >
                  <MdClose size={20} color='white'/>
                  </button>{' '}
                </span>
              ))}
            </div>
          );
        },
        width: 500,
      },
    ],
    [selectedTags]
  );

  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <div className='overflow-x-auto'>
      <h3 className='text-4xl'>Uploads</h3>
      <table
        {...getTableProps()}
        className="border-collapse w-full mt-4 text-center"
      >
        <thead className=''>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-2 text-left border bg-gray-200"
                  style={{ width: `${column.width}px` }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white rounded-md border border-2 border-separate border-spacing-2"
                style={{ border: '2px solid #000', borderRadius: '80px' }} 
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-2"
                    style={{ width: `${cell.column.width}px` }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
