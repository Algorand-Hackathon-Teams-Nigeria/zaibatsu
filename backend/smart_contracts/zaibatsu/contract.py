from beaker import * #type: ignore
from pyteal import * #type: ignore


app = Application("zaibatsu")


@app.external
def hello(name: abi.String, *, output: abi.String) -> Expr:
    return output.set(Concat(Bytes("Hello, "), name.get()))
