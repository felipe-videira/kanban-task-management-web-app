type Board = { id: string; title: string; columns?: Column[] };

type Column = { id: string; title: string; tasks?: Task[] };

type Task = { id: string; title: string };
