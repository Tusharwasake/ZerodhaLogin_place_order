import NavItem from "./NavItem";

function Navigation({ navItems, activeSection, onNavigation }) {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <NavItem
          key={item.key}
          item={item}
          isActive={activeSection === item.key}
          onClick={() => onNavigation(item.key)}
        />
      ))}
    </nav>
  );
}

export default Navigation;
