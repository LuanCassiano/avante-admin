import React from "react";
import { render } from "@testing-library/react-native";
import { useRoute } from "@react-navigation/native";
import { useGetDataById } from "../../../../hooks/useGetDataById";
import HeadOfficeDetail from "../HeadOfficeDetail";
import Loading from "../../../../components/Loading/Loading";
import { Text } from "react-native";

jest.mock("@react-navigation/native", () => ({
  useRoute: jest.fn(),
}));

jest.mock("../../../../hooks/useGetDataById", () => ({
  useGetDataById: jest.fn(),
}));

jest.mock("../../../../components/Loading/Loading", () => ({
  __esModule: true,
  default: () => require('react').createElement(require('react-native').Text, null, 'Loading...'),
}));

describe("HeadOfficeDetail", () => {
  it("renders loading state when data is being fetched", () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { id: "1" } });
    (useGetDataById as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    const { getByText } = render(<HeadOfficeDetail />);

    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders head office details when data is fetched", () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { id: "1" } });
    (useGetDataById as jest.Mock).mockReturnValue({
      data: {
        name: "Head Office Name",
        address: "123 Main St",
        addressNumber: "456",
        city: "Metropolis",
      },
      isLoading: false,
    });

    const { getByText } = render(<HeadOfficeDetail />);

    expect(getByText("Head Office Name")).toBeTruthy();
    expect(getByText("123 Main St")).toBeTruthy();
    expect(getByText("456")).toBeTruthy();
    expect(getByText("Metropolis")).toBeTruthy();
  });

  it("handles missing data gracefully", () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { id: "1" } });
    (useGetDataById as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    const { queryByText } = render(<HeadOfficeDetail />);

    expect(queryByText("Head Office Name")).toBeNull();
    expect(queryByText("123 Main St")).toBeNull();
    expect(queryByText("456")).toBeNull();
    expect(queryByText("Metropolis")).toBeNull();
  });
});
