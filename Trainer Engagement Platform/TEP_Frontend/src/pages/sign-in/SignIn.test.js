import {render, screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import SignIn from "./SignIn";

test("testing signin form",()=>{
    render(<SignIn/>);
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();

})