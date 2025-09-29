import React, { useState, useMemo, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useOrder } from './OrderContext';
import menuData from '../../data/menuData.json';
import './OrderNow.css';

// Import images (names map to dish ids manually ordered)
import house_salad from '../../images/order_now/house_salad.jpg';
import papa_huancaina from '../../images/order_now/papa_huancaina.jpg';
import tamalito_verde from '../../images/order_now/tamalito_verde.jpg';
import causa from '../../images/order_now/causa.jpg';
import croquetas from '../../images/order_now/croquetas.jpg';
import tartar from '../../images/order_now/tartar.jpg';
import bang_bang_shrimp from '../../images/order_now/bang_bang_shrimp.jpg';
import tiradito from '../../images/order_now/tiradito.jpg';
import cebiche from '../../images/order_now/cebiche.jpg';
import lomo_saltado from '../../images/order_now/lomo_saltado.jpg';
import arroz_chaufa from '../../images/order_now/arroz_chaufa.jpg';
import arroz_humedo from '../../images/order_now/arroz_humedo.jpg';
import aji_gallina from '../../images/order_now/aji_gallina.jpg';
import ossobuco_criolla from '../../images/order_now/ossobuco_criolla.jpg';
import seco_cabrito from '../../images/order_now/seco_cabrito.jpg';
import panceta_crocante from '../../images/order_now/panceta_crocante.jpg';
import pescado_macho from '../../images/order_now/pescado_macho.jpg';
import creama_volteada from '../../images/order_now/creama_volteada.jpg';
import picarones from '../../images/order_now/picarones.jpg';
import pie_limon from '../../images/order_now/pie_limon.jpg';
import torta_chocolate from '../../images/order_now/torta_chocolate.jpg';

const imageMap = {
  'HOUSE SALAD': house_salad,
  'PAPA A LA HUANCAÍNA': papa_huancaina,
  'TAMALITO VERDE': tamalito_verde,
  'CAUSA LIMEÑA': causa,
  'CROQUETAS DE AJÍ DE GALLINA': croquetas,
  'TARTAR': tartar,
  'BANG BANG SHRIMP': bang_bang_shrimp,
  'TIRADITO': tiradito,
  'CEBICHE CRIOLLO': cebiche,
  'LOMO SALTADO': lomo_saltado,
  'ARROZ CHAUFA': arroz_chaufa,
  'ARROZ HÚMEDO': arroz_humedo,
  'AJÍ DE GALLINA': aji_gallina,
  'OSSOBUCO A LA CRIOLLA': ossobuco_criolla,
  'CABRITO DE LECHE A LA NORTEÑA': seco_cabrito,
  'LA PANCETA CROCANTE': panceta_crocante,
  'PESCADO A LO MACHO': pescado_macho,
  'CREMA VOLTEADA': creama_volteada,
  'PICARONES': picarones,
  'PIE DE LIMÓN': pie_limon,
  'TORTA DE CHOCOLATE': torta_chocolate
};

function filterWithImages(list) {
  return list.filter(d => imageMap[d.name]);
}

const OrderNowPage = () => {
  const sections = useMemo(() => {
    const { mainMenu } = menuData;
    return [
      { id: 'appetizers', title: 'Appetizers', items: filterWithImages(mainMenu.entradas) },
      { id: 'main-courses', title: 'Main Courses', items: filterWithImages(mainMenu.platosPrincipales) },
      { id: 'desserts', title: 'Desserts', items: filterWithImages(mainMenu.postres) }
    ];
  }, []);
  const { dispatch } = useOrder();
  const [selected, setSelected] = useState(null); // dish object
  const [qty, setQty] = useState(1);

  const openDish = dish => {
    setSelected(dish);
    setQty(1);
  };
  const close = () => setSelected(null);

  const addToOrder = () => {
    if (!selected) return;
    const price = typeof selected.price === 'string' ? parseFloat(selected.price.split('/')[0]) : selected.price;
    dispatch({ type: 'ADD_ITEM', payload: { id: selected.id, name: selected.name, price, image: imageMap[selected.name], qty } });
    close();
  };

  // Close on ESC
  useEffect(() => {
    if (!selected) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected]);

  // Dynamic background: darker at top, lighter after scroll 120px
  useEffect(() => {
    const root = document.documentElement;
    const handleScroll = () => {
      if (window.scrollY > 120) {
        root.classList.add('order-bg-light');
      } else {
        root.classList.remove('order-bg-light');
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <div className="order-now-page">
        <h1 className="order-title">Order Now</h1>

        {sections.map(section => (
          <section key={section.id} className="order-section" id={section.id}>
            <h2 className="order-section-title">{section.title}</h2>
            <div className="order-grid three-cols">
              {section.items.map(dish => {
              const shortDesc = dish.description ? dish.description.slice(0, 110) + (dish.description.length > 110 ? '...' : '') : '';
              return (
                <div key={dish.id} className="order-card" onClick={() => openDish(dish)}>
                  <div className="order-card-text">
                    <h3>{dish.name}</h3>
                    {shortDesc && <p>{shortDesc}</p>}
                      <span className="price">$ {dish.price}</span>
                  </div>
                  <div className="order-card-image">
                    <img src={imageMap[dish.name]} alt={dish.name} />
                    <button className="add-inline" aria-label="open add modal">+</button>
                  </div>
                </div>
              );
              })}
            </div>
          </section>
        ))}

        {selected && (
        <div className="order-modal" role="dialog" aria-modal="true" onClick={close}>
          <div className="modal-backdrop" />
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close" aria-label="Close" onClick={(e)=>{ e.stopPropagation(); close(); }}>×</button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={imageMap[selected.name]} alt={selected.name} />
              </div>
              <div className="modal-info">
                <h2>{selected.name}</h2>
                {selected.description && <p>{selected.description}</p>}
                <div className="qty-control">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
                <button className="add-btn" onClick={addToOrder}>
                  Add Order • $ { (typeof selected.price === 'string' ? parseFloat(selected.price.split('/')[0]) : selected.price) * qty }
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderNowPage;
