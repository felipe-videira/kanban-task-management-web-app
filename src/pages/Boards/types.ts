type Board = { id?: string; title: string; columns?: Column[] };

type Column = {
  id?: string;
  title: string;
  color?: string;
  order?: number;
  tasks?: Task[];
};

type Task = { id: string; title: string };
