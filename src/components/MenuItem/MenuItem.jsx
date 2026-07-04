import "./MenuItem.css";

function MenuItem({ title, icon, onClick }) {
    return (
        <div
            className="menu-item"
            onClick={onClick}
            style={{
                color: "red",
                border: "1px solid red"
            }}
        >
            <span className="menu-item-icon">{icon}</span>
            <span className="menu-item-title">{title}</span>
        </div>
    );
}

export default MenuItem;