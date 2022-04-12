export const navigateMock = jest.fn();
export const useParamsMock = jest.fn();

export const useParams = useParamsMock;
export const useNavigate = () => navigateMock;
