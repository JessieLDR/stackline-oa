import React from 'react';
import { ProductData } from '../types/productTypes';

interface ProductInfoProps {
	product: ProductData;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
	const { image, title, subtitle, tags } = product;

	return (
		<div>
			<div style={{ margin: '0 10%', textAlign: 'center', width: '80%' }}>
				<img src={image} alt="" style={{ width: '100%', height: 'auto' }} />
			</div>
			<div style={{ margin: '0 10%', width: '80%' }}>
				<h2>{title}</h2>
				<span style={{ color: '#999' }}>{subtitle}</span>
				<ul style={{ listStyleType: 'none', padding: 0 }}>
					{tags.map((tag, index) => (
						<li key={index} style={{ display: 'inline-block', marginRight: '5px', marginBottom: '5px', padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>{tag}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProductInfo;
