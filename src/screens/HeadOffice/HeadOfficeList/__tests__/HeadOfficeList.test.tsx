import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { useGetAllData } from "../../../../hooks/useGetAllData";
import { useDeleteData } from "../../../../hooks/useDeleteData";
import { useToast } from "../../../../hooks/useToast";
import { navigate } from "../../../../service/NavigationService";
import HeadOfficeList from "../HeadOfficeList";

jest.mock("../../../../hooks/useGetAllData");
jest.mock("../../../../hooks/useDeleteData");
jest.mock("../../../../hooks/useToast");
jest.mock("../../../../service/NavigationService");

describe("HeadOfficeList", () => {
  const mockNavigate = jest.fn();
  const mockError = jest.fn();
  const mockDeleteMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (navigate as jest.Mock).mockImplementation(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({ error: mockError });
    (useDeleteData as jest.Mock).mockReturnValue({ mutate: mockDeleteMutate });
  });

  it('snapshot', () => {
    const mockData = [
      { id: "1", name: "Head Office 1", address: "Address 1" },
      { id: "2", name: "Head Office 2", address: "Address 2" },
    ];

    (useGetAllData as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });
    
    const tree = render(<HeadOfficeList />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders loading state", () => {
    (useGetAllData as jest.Mock).mockReturnValue({
      data: null,
      isError: false,
      isLoading: true,
    });

    render(<HeadOfficeList />);

    expect(screen.getByTestId("loading-spinner")).toBeTruthy();
  });

  it("renders error toast when data fetching fails", () => {
    (useGetAllData as jest.Mock).mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
    });

    render(<HeadOfficeList />);

    expect(mockError).toHaveBeenCalledWith("Erro ao carregar informações");
  });

  it("renders list items correctly", () => {
    const mockData = [
      { id: "1", name: "Head Office 1", address: "Address 1" },
      { id: "2", name: "Head Office 2", address: "Address 2" },
    ];

    (useGetAllData as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    render(<HeadOfficeList />);

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeTruthy();
      expect(screen.getByText(item.address)).toBeTruthy();
    });
  });

  it("calls deleteMutate when delete button is clicked", () => {
    const mockData = [{ id: "1", name: "Head Office 1", address: "Address 1" }];

    (useGetAllData as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    const mockDeleteMutate = jest.fn();
    (useDeleteData as jest.Mock).mockReturnValue({
      mutate: mockDeleteMutate,
    });

    render(<HeadOfficeList />);

    const deleteButton = screen.getByTestId(`delete-button-${mockData[0].id}`);
    fireEvent.press(deleteButton);

    expect(mockDeleteMutate).toHaveBeenCalledWith(mockData[0].id);
  });

  it("navigates to edit screen when edit button is clicked", () => {
    const mockData = [{ id: "1", name: "Head Office 1", address: "Address 1" }];

    (useGetAllData as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    render(<HeadOfficeList />);

    const editButton = screen.getByTestId(`edit-button-${mockData[0].id}`);
    fireEvent.press(editButton);

    expect(mockNavigate).toHaveBeenCalledWith("HeadOfficeForm", { data: mockData[0] });
  });

  it("navigates to detail screen when view button is clicked", () => {
    const mockData = [{ id: "1", name: "Head Office 1", address: "Address 1" }];

    (useGetAllData as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    render(<HeadOfficeList />);

    const viewButton = screen.getByTestId(`view-button-${mockData[0].id}`);
    fireEvent.press(viewButton);

    expect(mockNavigate).toHaveBeenCalledWith("HeadOfficeDetail", { id: mockData[0].id });
  });

  it("navigates to form screen when FAB is clicked", () => {
    (useGetAllData as jest.Mock).mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    });

    render(<HeadOfficeList />);

    const fabButton = screen.getByRole('button');
    fireEvent.press(fabButton);

    expect(mockNavigate).toHaveBeenCalledWith("HeadOfficeForm");
  });
});
