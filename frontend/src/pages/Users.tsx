import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";
import { logout } from "../services/authService";
import { CountUp } from "countup.js";
import PageHeader from "./PageHeader";
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
};

type PaginationMeta = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
};

const SORT_FIELDS: Record<string, string> = {
  id: "id",
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  phone: "phone",
  city: "city",
  province: "province",
  country: "country",
};

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!countRef.current) return;

    const countUp = new CountUp(countRef.current, meta?.total ?? 0);

    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }, [meta?.total]);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsers(page, 10, search, sortBy, order);

      setUsers(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, sortBy, order]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);
  const handleSort = (fieldKey: string) => {
    const backendField = SORT_FIELDS[fieldKey] || fieldKey;

    if (sortBy === backendField) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(backendField);
      setOrder("asc");
    }
    setPage(1);
  };

  const renderSortIcon = (fieldKey: string) => {
    const backendField = SORT_FIELDS[fieldKey] || fieldKey;
    if (sortBy !== backendField)
      return <span className="ml-1 text-gray-400">↕</span>;
    return order === "asc" ? (
      <span className="ml-1 font-bold">↑</span>
    ) : (
      <span className="ml-1 font-bold">↓</span>
    );
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  if (loading && !users.length) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Users" breadcrumbs={[{ label: "Users" }]} />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl rounded-lg bg-white p-6 shadow">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Users</h1>
              <h2 className="text-gray-500">
                Total Users: <span ref={countRef}>0</span>
              </h2>
            </div>

            <div className="flex gap-2">
              <Link
                to="/users/create"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Add User
              </Link>

              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-80 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Search
            </button>
          </form>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200 select-none">
                <tr>
                  <th
                    onClick={() => handleSort("id")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    ID {renderSortIcon("id")}
                  </th>
                  <th
                    onClick={() => handleSort("firstName")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    First Name {renderSortIcon("firstName")}
                  </th>
                  <th
                    onClick={() => handleSort("lastName")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    Last Name {renderSortIcon("lastName")}
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    Email {renderSortIcon("email")}
                  </th>
                  <th
                    onClick={() => handleSort("phone")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    Phone {renderSortIcon("phone")}
                  </th>
                  <th
                    onClick={() => handleSort("city")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    City {renderSortIcon("city")}
                  </th>
                  <th
                    onClick={() => handleSort("province")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    Province {renderSortIcon("province")}
                  </th>
                  <th
                    onClick={() => handleSort("country")}
                    className="cursor-pointer border p-3 text-left hover:bg-gray-300"
                  >
                    Country {renderSortIcon("country")}
                  </th>
                  <th className="border p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-6 text-center">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border p-3">{user.id}</td>
                      <td className="border p-3">{user.firstName}</td>
                      <td className="border p-3">{user.lastName}</td>
                      <td className="border p-3">{user.email}</td>
                      <td className="border p-3">{user.phone}</td>
                      <td className="border p-3">{user.city}</td>
                      <td className="border p-3">{user.province}</td>
                      <td className="border p-3">{user.country}</td>
                      <td className="border p-3">
                        <div className="flex gap-2">
                          <Link
                            to={`/users/edit/${user.id}`}
                            className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            aria-label="Pagination"
            className="mt-4 d-flex justify-content-center"
          >
            <ul className="pagination">
              {/* Previous */}
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  &laquo;
                </button>
              </li>

              {/* Page Numbers */}
              {Array.from({ length: meta?.lastPage ?? 1 }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              {/* Next */}
              <li
                className={`page-item ${
                  page >= (meta?.lastPage ?? 1) ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={page >= (meta?.lastPage ?? 1)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
