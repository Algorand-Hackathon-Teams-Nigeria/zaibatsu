import pytest
from algokit_utils import (
    ApplicationClient,
    ApplicationSpecification,
    get_localnet_default_account,
)
from algosdk.v2client.algod import AlgodClient

from smart_contracts.zaibatsu import contract as zaibatsu_contract


@pytest.fixture(scope="session")
def zaibatsu_app_spec(algod_client: AlgodClient) -> ApplicationSpecification:
    return zaibatsu_contract.app.build(algod_client)


@pytest.fixture(scope="session")
def zaibatsu_client(
    algod_client: AlgodClient, zaibatsu_app_spec: ApplicationSpecification
) -> ApplicationClient:
    client = ApplicationClient(
        algod_client,
        app_spec=zaibatsu_app_spec,
        signer=get_localnet_default_account(algod_client),
    )
    client.create()
    return client


def test_says_hello(zaibatsu_client: ApplicationClient) -> None:
    result = zaibatsu_client.call(zaibatsu_contract.hello, name="World")

    assert result.return_value == "Hello, World"
