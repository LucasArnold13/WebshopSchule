function Navlink1() {

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
        padding: "10px 15px",
        borderRadius: "8px",
        backgroundColor: isActive ? "rgba(255, 255, 255, 0.3)" : "transparent",
        display: "block",
    });

    return (
            <NavLink
                to="/customer/addresses"
                style={navLinkStyle}
            >
                Adressen
            </NavLink>
    );
}

export default Navlink1;