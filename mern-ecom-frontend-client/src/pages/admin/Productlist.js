import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
} from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../components/Admin/CustomModal";
import { Flex, Tag, Button } from "antd";
import PromotionEditModal from "../../components/Admin/PromotionEditModal";
import {
  getPromotedProducts,
  promoteProduct,
  demoteProduct,
  updatePromotedProduct,
} from "../../features/promotedProducts/promotedProductsSlice";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Promoted",
    dataIndex: "promo",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openPromotionModal, setOpenPromotionModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [promoteProductId, setPromoteProductId] = useState("");
  const [promoModalData, setPromoModalData] = useState({});
  const [isEditingPromotion, setIsEditingPromotion] = useState(false);

  const showModal = (productId) => {
    setOpen(true);
    setProductId(productId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const hidePromotionModal = () => {
    setOpenPromotionModal(false);
  };

  const showPromotionModal = (productId, isEditing = false) => {
    if (isEditing) {
      const promotionData = promotedProducts.find(
        (p) => p.product._id === productId
      );
      setPromoModalData(promotionData || {});
    } else {
      setPromoModalData({}); // Reset or set defaults for new promotion
    }

    setOpenPromotionModal(true);
    setPromoteProductId(productId);
    setIsEditingPromotion(isEditing);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPromotedProducts());
  }, []);

  const productState = useSelector((state) => state.products.products);
  const promotedProducts = useSelector(
    (state) => state.promotedProducts.promotedProducts
  );

  const productTableData = useMemo(
    () =>
      productState.map((product, index) => {
        // Check if the current product is promoted
        const isPromoted = promotedProducts.some(
          (promotedProduct) => promotedProduct.product._id === product._id
        );

        return {
          key: product._id,
          id: index + 1,
          title: product.title,
          brand: product.brand,
          category: product.category,
          color: product.color,
          price: `${product.price}`,
          promo: (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* Show Promote button if not promoted, otherwise show Edit Promo button */}
              {!isPromoted ? (
                <Button
                  type="primary"
                  onClick={() => showPromotionModal(product._id)}
                >
                  Promote
                </Button>
              ) : (
                <Button
                  onClick={() => showPromotionModal(product._id, true)}
                  style={{ background: "#ffec3d" }}
                >
                  Edit Promo
                </Button>
              )}
            </div>
          ),
          action: (
            <>
              <Link
                to={`/dashboard/product/${product._id}`}
                className="fs-3 text-danger"
              >
                <BiEdit />
              </Link>
              <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(product._id)}
              >
                <AiFillDelete />
              </button>
            </>
          ),
        };
      }),
    [productState, promotedProducts]
  );

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));

    setOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="mb-4 title">Promoted Products</h3>

        {/* Main Promoted Products Section */}
        {promotedProducts.some((product) => product.promoType === "main") && (
          <>
            <h6 className="mb-1 title">Main Promoted Products</h6>
            <Flex gap="4px 0" wrap="wrap">
              {promotedProducts
                .filter((product) => product.promoType === "main")
                .map((product) => (
                  <Tag
                    key={product._id}
                    bordered={false}
                    closable
                    className="product-list-tags"
                    color="processing"
                    onClose={() => {
                      dispatch(demoteProduct(product.product._id))
                        .then(() => {
                          toast.success("Product demoted successfully");
                        })
                        .catch((error) => {
                          toast.error(
                            "Failed to demote product. Please try again."
                          );
                        });
                    }}
                  >
                    {product?.product?.title}
                  </Tag>
                ))}
            </Flex>
          </>
        )}

        {/* Famous Promoted Products Section */}
        {promotedProducts.some((product) => product.promoType === "famous") && (
          <>
            <h6 className="mb-1 mt-3 title">Famous Promoted Products</h6>
            <Flex gap="4px 0" wrap="wrap">
              {promotedProducts
                .filter((product) => product.promoType === "famous")
                .map((product) => (
                  <Tag
                    key={product._id}
                    bordered={false}
                    closable
                    className="product-list-tags"
                    color="processing"
                    onClose={() => {
                      dispatch(demoteProduct(product.product._id))
                        .then(() => {
                          toast.success("Product demoted successfully");
                        })
                        .catch((error) => {
                          toast.error(
                            "Failed to demote product. Please try again."
                          );
                        });
                    }}
                  >
                    {product?.product?.title}
                  </Tag>
                ))}
            </Flex>
          </>
        )}
      </div>

      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={productTableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteProduct(productId)}
        title="Are you sure you want to delete this product?"
      />

      <PromotionEditModal
        hidePromotionModal={hidePromotionModal}
        openPromotionModal={openPromotionModal}
        promoteProductId={promoteProductId}
        onPromoteProduct={(promoData) => dispatch(promoteProduct(promoData))}
        onUpdatePromotedProduct={(promoData) =>
          dispatch(updatePromotedProduct(promoData))
        }
        isEditingPromotion={isEditingPromotion}
        existingPromotionData={promoModalData}
      />
    </div>
  );
};

export default Productlist;
