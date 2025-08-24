type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section
      style={{
        display: 'flex',
        minHeight: '100vh', // на всю высоту
      }}
    >
      <aside
        style={{
          width: '220px',
          background: '#222',
          padding: '16px',
          color: '#fff', // чтобы текст был виден
        }}
      >
        {sidebar}
      </aside>
      <div
        style={{
          flex: 1, // занимает всё остальное место
          padding: '16px',
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default NotesLayout;
