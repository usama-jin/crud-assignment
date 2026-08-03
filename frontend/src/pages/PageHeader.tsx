import { Link } from "react-router-dom";

type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
};

export default function PageHeader({ title, subtitle, breadcrumbs }: Props) {
  return (
    <div className="page-header d-print-none mb-4">
      <div className="container-xl">
        <div className="card border-0 shadow-sm">
          <div className="card-body py-4">
            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-2">
                {breadcrumbs.map((item, index) => (
                  <li
                    key={index}
                    className={`breadcrumb-item ${
                      index === breadcrumbs.length - 1 ? "active" : ""
                    }`}
                    aria-current={
                      index === breadcrumbs.length - 1 ? "page" : undefined
                    }
                  >
                    {item.href ? (
                      <Link to={item.href} className="text-decoration-none">
                        {item.label}
                      </Link>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Title */}
            <div className="d-flex align-items-center">
              <div className="avatar avatar-md bg-primary-lt me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </div>

              <div>
                <h2 className="page-title mb-1">{title}</h2>

                {subtitle && <div className="text-secondary">{subtitle}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
