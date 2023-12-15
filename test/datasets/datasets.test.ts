import { describe } from "mocha"
import { Generator } from "../shared/generator"
import { DatasetsHelperInstance } from "../helpers/datasetsHelper"
import { DatasetsAssertion } from "../assertions/datasetsAssertion"
import { Accounts } from "../shared/accounts"

describe("datasetsMetadata", () => {
    it("submitDatasetMetadataCorrect", async function () {
        let generators = new Generator()
        let datasetsAssertion = new DatasetsAssertion()

        let [governance,] = Accounts.Instance().getGovernance()
        await datasetsAssertion.governanceAddressAssertion(governance)

        let genMeta = generators.generatorDatasetMetadata();


        this.timeout(100000)
        const dataClientId = 100

        let tx = await DatasetsHelperInstance.submitDatasetMetadata(
            dataClientId,
            genMeta.title,
            genMeta.industry,
            genMeta.name,
            genMeta.description,
            genMeta.source,
            genMeta.accessMethod,
            genMeta.sizeInBytes,
            genMeta.isPublic,
            genMeta.version
        )

        await tx

        let [client,] = Accounts.Instance().getClient()
        await Promise.all(
            [
                datasetsAssertion.getDatasetStateAssertion(0),
                datasetsAssertion.getDatasetMetadataAssertion(genMeta),
                datasetsAssertion.getDatasetMetadataSubmitterAssertion(client),
                datasetsAssertion.hasDatasetMetadataAssertion(genMeta.accessMethod)
            ]
        )
    })

    //it("submitDatasetReplicaRequirementsCorrect", async function () {
    //    let datasets = DatasetsHelper.Instance()
    //    await datasets.submitDatasetReplicaRequirements()

    //    let count = await datasets.getDatasetReplicasCount()
    //    console.log("replica count:", count)
    //    expect(count).to.be.equal(Requirements.Instance().getRequirementsCount())
    //})
})
