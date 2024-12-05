import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../components/Shared/Modal';
import './CartPage.css';

function CartPage({ cart, setCart, removeFromCart, theme }) {
  // 모달 상태와 선택된 아이템 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 총 가격 계산 함수
  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // 구매 수량 변경 함수 (증가 또는 감소)
  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && (item.quantity + change > 0)
          ? { ...item, quantity: item.quantity + change }
          : item
      )
    );
  };

  // "제거" 버튼 클릭 시 모달 열기
  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // 모달에서 "확인" 버튼 클릭 시 아이템 제거
  const handleConfirmRemove = () => {
    if (selectedItem) {
      removeFromCart(selectedItem.id); // 선택된 아이템 제거
      toast.success(`${selectedItem.name}이(가) 삭제되었습니다.`); // 성공 알림 표시
    }
    setIsModalOpen(false); // 모달 닫기
    setSelectedItem(null); // 선택된 아이템 초기화
  };

  // "결제하기" 버튼 클릭 시 처리
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('카트에 상품이 없습니다.'); // 에러 알림 표시
      return;
    }
    // 결제 완료 알림 표시
    toast.success(
      `총 결제 금액은 ${calculateTotalPrice().toLocaleString()}원입니다.\n결제가 완료되었습니다.`
    );
    setCart([]); // 카트 초기화
    localStorage.removeItem('cart'); // localStorage에서도 제거
  };

  return (
    <div className={`cart-page ${theme}`}>
      {/* 알림 컨테이너 */}
      <ToastContainer />
      {/* 모달 컴포넌트 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        message={`${selectedItem?.name}을(를) 삭제하시겠습니까?`}
        theme={theme}
      />
      <h1 className="cart-title">CART</h1>
      {cart.length === 0 ? (
        // 카트가 비어 있을 때 메시지 표시
        <p className="empty-cart">카트에 담긴 상품이 없습니다.</p>
      ) : (
        <>
          {/* 카트 상품 목록 */}
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className={`cart-item ${theme}`}>
                {/* 상품 이미지 */}
                <img
                  src={require(`../../assets/images/${item.image}`)}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  {/* 상품 이름 */}
                  <h3 className="cart-item-name">{item.name}</h3>
                  {/* 상품 가격 */}
                  <p className="cart-item-price">
                    {item.price.toLocaleString()}원
                  </p>
                  {/* 수량 변경 버튼 */}
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  {/* 상품 설명 */}
                  <p className="cart-item-description">{item.description}</p>
                </div>
                {/* 제거 버튼 */}
                <button
                  className="cart-item-remove-button"
                  onClick={() => handleRemoveClick(item)}
                >
                  제거
                </button>
              </li>
            ))}
          </ul>
          {/* 총 가격 표시 */}
          <div className="cart-total">
            <h2>총 가격: {calculateTotalPrice().toLocaleString()}원</h2>
          </div>
          {/* 결제하기 버튼 */}
          <button className="checkout-button" onClick={handleCheckout}>
            결제하기
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;