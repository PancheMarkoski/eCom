import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, deleteBrand } from "../../features/barnds/brandsSlice";
import CustomModal from "../../components/Admin/CustomModal";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (brandId) => {
    setOpen(true);
    setBrandId(brandId);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brands.brands);

  const brandData = useMemo(
    () =>
      brandState.map((brand, i) => ({
        key: brand._id,
        id: i + 1,
        name: brand.title,
        action: (
          <>
            <Link
              to={`/dashboard/brand/${brand._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brand._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      })),
    [brandState]
  );

  const handleDeleteBrand = (brandId) => {
    dispatch(deleteBrand(brandId))
      .unwrap() // Unwrap the result of the action, allowing us to handle it as a promise.
      .then(() => {
        toast.success("Brand deleted successfully");
        // Optionally, you can re-fetch the brands list here if you want to ensure the list is updated
        // dispatch(getBrands());
      })
      .catch((error) => {
        // The error can be logged or handled as needed
        console.error("Delete brand failed:", error);
        toast.error("Error deleting brand");
      })
      .finally(() => {
        setOpen(false); // Close the modal in both cases
      });

    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={brandData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteBrand(brandId)}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default Brandlist;
