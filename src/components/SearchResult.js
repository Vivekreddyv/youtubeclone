import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchDataFromApi } from '../utils/api';
import { Context } from '../context/contestApi';
import LeftNav from './LeftNav';
import SearchResultVideoCard from './SearchResultVideoCard';
import { v4 as uuidv4 } from 'uuid';

const SearchResult = () => {
	const [result, setResult] = useState([]);
	const { searchQuery } = useParams();
	const { setLoading } = useContext(Context);

	useEffect(() => {
		document.getElementById('root').classList.remove('custom-h');
		fetchSearchResults();
	}, [searchQuery]);

	const fetchSearchResults = () => {
		setLoading(true);

		fetchDataFromApi(`search/?q=${searchQuery}`).then(res => {
			setResult(res);
			setLoading(false);
		});
	};

	return (
		<div className="flex flex-row h-[calc(100%-56px)]">
			<LeftNav />
			<div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
				<div className="grid grid-cols-1 gap-2 p-5 ">
					{result?.contents?.map(item => {
						if (item.type !== 'video') return false;
						return (
							<SearchResultVideoCard
								key={uuidv4()}
								video={item?.video}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SearchResult;
