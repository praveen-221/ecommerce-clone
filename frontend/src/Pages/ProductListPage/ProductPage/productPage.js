import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../actions';

function ProductPage() {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products);
    const useQuery = () => new URLSearchParams(useLocation().search);
	const query = useQuery();

    useEffect(() => { 
		const cid = query.get('cid');
		const type = query.get('type');
        const payload = {
            cid, type
        }
        dispatch(getProductPage(payload));
    }, [])

    return (
        <>

        </>
    )
}

export default ProductPage