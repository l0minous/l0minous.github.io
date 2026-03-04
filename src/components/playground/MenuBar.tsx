interface MenuBarProps {
  onClear: () => void;
  onSave: () => void;
}

export function MenuBar({ onClear, onSave }: MenuBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '24px',
        backgroundColor: '#FFFFFF',
        borderBottom: '2px solid #000000',
        fontFamily: '"Press Start 2P", "Chicago", "Geneva", "Monaco", "Courier New", monospace',
        fontSize: '9px',
        color: '#000000',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* Apple menu */}
      <div
        style={{
          padding: '0 10px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          borderRight: '1px solid #000',
          fontSize: '14px',
        }}
      >
        &#63743;
      </div>
      {['File', 'Edit', 'Goodies', 'Font', 'FontSize'].map((item) => (
        <div
          key={item}
          style={{
            padding: '0 10px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid #000',
            fontWeight: 'bold',
          }}
        >
          {item}
        </div>
      ))}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Functional buttons on the right */}
      <button
        onClick={onClear}
        style={{
          padding: '0 10px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          borderLeft: '1px solid #000',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: '#000',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#000';
          e.currentTarget.style.color = '#FFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#000';
        }}
      >
        Clear
      </button>
      <button
        onClick={onSave}
        style={{
          padding: '0 10px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          borderLeft: '1px solid #000',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: '#000',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#000';
          e.currentTarget.style.color = '#FFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#000';
        }}
      >
        Save
      </button>
    </div>
  );
}
