import React from 'react';
import products from '../../data/products'; // 상품 데이터 가져오기
import './MainPage.css'; // MainPage 스타일

function MainPage({ addToCart }) {
  return (
    <div className="main-page">
      {/* 페이지 제목 */}
      <h1>디자이너</h1>
      {/* 추천도서 부제목 */}
      <h2>필독 추천도서</h2>
      {/* 상품 목록을 그리드 형태로 표시 */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {/* 상품 이미지 컨테이너 */}
            <div className="product-image-container">
              <img
                src={require(`../../assets/images/${product.image}`)} // 상품 이미지
                alt={product.name} // 대체 텍스트
                className="product-image"
              />
            </div>
            {/* 상품 이름 */}
            <h3 className="product-name">{product.name}</h3>
            {/* 상품 가격 */}
            <p className="product-price">{product.price.toLocaleString()}원</p>
            {/* 상품 설명 */}
            <p className="product-description">{product.description}</p>
            {/* 카트에 담기 버튼 */}
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)} // 클릭 시 카트에 상품 추가
            >
              CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;