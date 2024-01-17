

## [0.17.3](https://github.com/dataswap/dataswapjs/compare/0.17.2...0.17.3) (2024-01-17)


### Bug Fixes

* 🐛 export MatchingInfo ([38b8ae6](https://github.com/dataswap/dataswapjs/commit/38b8ae6545aa47601d0a9b08630caeac205dee06))

## [0.17.2](https://github.com/dataswap/dataswapjs/compare/0.17.1...0.17.2) (2024-01-17)


### Bug Fixes

* 🐛 Debug issue of writing empty array ([c8978e1](https://github.com/dataswap/dataswapjs/commit/c8978e134f7a50e9a38fb21803a67498d248b461)), closes [#209](https://github.com/dataswap/dataswapjs/issues/209)
* 🐛 initialize status of metadata ([9a88d5b](https://github.com/dataswap/dataswapjs/commit/9a88d5be1c7d711350162cabe271cc6407e623cc)), closes [#208](https://github.com/dataswap/dataswapjs/issues/208)
* 🐛 invalid car replica info ([de1d4c1](https://github.com/dataswap/dataswapjs/commit/de1d4c115473d5c9186ffd41d08e2ff0583c6db8)), closes [#217](https://github.com/dataswap/dataswapjs/issues/217)
* 🐛 Modify the requirement in the MatchingMetadata model ([5cce1c9](https://github.com/dataswap/dataswapjs/commit/5cce1c97c5a64142ae10a7e69bed138091c78a0a)), closes [#214](https://github.com/dataswap/dataswapjs/issues/214)
* 🐛 update filecoin version to 2.1.3 ([04e95a7](https://github.com/dataswap/dataswapjs/commit/04e95a76a230c3b57e35993cd8e1bc837f5b4029)), closes [#210](https://github.com/dataswap/dataswapjs/issues/210)

## [0.17.1](https://github.com/dataswap/dataswapjs/compare/0.17.0...0.17.1) (2024-01-16)


### Bug Fixes

* 🐛 Export MatchingBidMongoDatastore class ([5f0bbb3](https://github.com/dataswap/dataswapjs/commit/5f0bbb3e49352304f414825bbe1ebe17f000df69)), closes [#203](https://github.com/dataswap/dataswapjs/issues/203)
* 🐛 rename updateReplicaState to updateReplica ([75d6204](https://github.com/dataswap/dataswapjs/commit/75d6204d85994334fc4b3a0816b7845c35d925e0)), closes [#204](https://github.com/dataswap/dataswapjs/issues/204)

# [0.17.0](https://github.com/dataswap/dataswapjs/compare/0.16.1...0.17.0) (2024-01-16)


### Bug Fixes

* 🐛 Debug for methods of datastore update ([caec256](https://github.com/dataswap/dataswapjs/commit/caec2561a73cf7871f120bf891a6fb53a953a883)), closes [#201](https://github.com/dataswap/dataswapjs/issues/201)


### Features

* 🎸 Add a "dataType","cid" field to Car model ([90a196e](https://github.com/dataswap/dataswapjs/commit/90a196ecaed51085dc636b6b740048c8cb5264f6)), closes [#169](https://github.com/dataswap/dataswapjs/issues/169)

## [0.16.1](https://github.com/dataswap/dataswapjs/compare/0.16.0...0.16.1) (2024-01-16)


### Bug Fixes

* 🐛 bug of extend method of datastore ([b591b39](https://github.com/dataswap/dataswapjs/commit/b591b391985b098078f3b53b441ac5fcdf3c9177)), closes [#198](https://github.com/dataswap/dataswapjs/issues/198)

# [0.16.0](https://github.com/dataswap/dataswapjs/compare/0.15.0...0.16.0) (2024-01-15)


### Bug Fixes

* 🐛 CarReplica primary key configuration issue ([0ab8114](https://github.com/dataswap/dataswapjs/commit/0ab8114743399cbd646a51b4132a9f432517a79f)), closes [#176](https://github.com/dataswap/dataswapjs/issues/176)
* 🐛 move datastore utils to th datasotre ([c6b9b3e](https://github.com/dataswap/dataswapjs/commit/c6b9b3e97e5f34c29927fa624ad6e744201d4158)), closes [#187](https://github.com/dataswap/dataswapjs/issues/187)
* 🐛 Remove grantDataswapContractRole duplicate interface ([7c8af83](https://github.com/dataswap/dataswapjs/commit/7c8af832c11a655a4223e9586c0b632008cd8022)), closes [#163](https://github.com/dataswap/dataswapjs/issues/163)


### Features

* 🎸 add bidding model ([7c1d0f9](https://github.com/dataswap/dataswapjs/commit/7c1d0f944b15f90cf7de6e8be07421ce547dd601)), closes [#172](https://github.com/dataswap/dataswapjs/issues/172)
* 🎸 add update function for carreplica datastore ([e5b478f](https://github.com/dataswap/dataswapjs/commit/e5b478f4868d4c7ebe3786afd5f11a2d5f46ed43)), closes [#189](https://github.com/dataswap/dataswapjs/issues/189)
* 🎸 Add value parameter when decoding payment functions ([d2ad8ed](https://github.com/dataswap/dataswapjs/commit/d2ad8edf38f965bdb18fd1646cd20588b5d5ef7a)), closes [#175](https://github.com/dataswap/dataswapjs/issues/175)
* 🎸 Complete DatasetId field for Matching-related method ([9e5975e](https://github.com/dataswap/dataswapjs/commit/9e5975e41d4d17af66e38cf6ff0f59ecc0d53d33)), closes [#174](https://github.com/dataswap/dataswapjs/issues/174)
* 🎸 Define Basic Params Info structures ([600c273](https://github.com/dataswap/dataswapjs/commit/600c2734736a293e42fe8836abdf34a97bdc2b4c)), closes [#186](https://github.com/dataswap/dataswapjs/issues/186)
* 🎸 extend datasetrequirement ([1d38428](https://github.com/dataswap/dataswapjs/commit/1d384289c4542da3ca116dc58d8bedd4d582df6f)), closes [#171](https://github.com/dataswap/dataswapjs/issues/171)
* 🎸 extend matching metadata ([1d55a4b](https://github.com/dataswap/dataswapjs/commit/1d55a4bea302f61cd3ef1eb16055b07ec369d528)), closes [#173](https://github.com/dataswap/dataswapjs/issues/173)
* 🎸 update status in dataset metadata ([5f73a3b](https://github.com/dataswap/dataswapjs/commit/5f73a3b486676d72877024ffc3728e81d22d5b01)), closes [#167](https://github.com/dataswap/dataswapjs/issues/167)
* 🎸 update the replicaInfos in car model ([d1be323](https://github.com/dataswap/dataswapjs/commit/d1be3237e628987b255edbcc5342632de6d6171d)), closes [#168](https://github.com/dataswap/dataswapjs/issues/168)

# [0.15.0](https://github.com/dataswap/dataswapjs/compare/0.13.2...0.15.0) (2024-01-10)


### Bug Fixes

* 🐛 version no ([3c02d4e](https://github.com/dataswap/dataswapjs/commit/3c02d4ec2899d2267bf68cab13607ba0c9532f55))


### Features

* 🎸 modifying bigint within complex type ([658f3e0](https://github.com/dataswap/dataswapjs/commit/658f3e06fbfd221a5bd762df14980dd5087cc3c2)), closes [#161](https://github.com/dataswap/dataswapjs/issues/161)

## [0.13.2](https://github.com/dataswap/dataswapjs/compare/0.13.1...0.13.2) (2024-01-10)


### Bug Fixes

* 🐛 Modify the params of the DataswapMessage to optional ([044cf18](https://github.com/dataswap/dataswapjs/commit/044cf1830145d0cf4e10adbb723e5a9febd197ec)), closes [#159](https://github.com/dataswap/dataswapjs/issues/159)

## [0.13.1](https://github.com/dataswap/dataswapjs/compare/0.13.0...0.13.1) (2024-01-09)


### Bug Fixes

* 🐛 fix matching target model ([d59e476](https://github.com/dataswap/dataswapjs/commit/d59e476b7f54877a01a898854f83bef91c05ec8f)), closes [#154](https://github.com/dataswap/dataswapjs/issues/154)

# [0.13.0](https://github.com/dataswap/dataswapjs/compare/0.12.3...0.13.0) (2024-01-09)


### Bug Fixes

* 🐛 Modify the database name for MatchingMetadata ([875e355](https://github.com/dataswap/dataswapjs/commit/875e3558c3f524dcd6ef0ea28e82c930748a275b)), closes [#149](https://github.com/dataswap/dataswapjs/issues/149)


### Features

* 🎸 Encapsulation of the data storage utility ([a6b5608](https://github.com/dataswap/dataswapjs/commit/a6b560859f885273db22e494f5a56412bf8343fe)), closes [#150](https://github.com/dataswap/dataswapjs/issues/150) [#151](https://github.com/dataswap/dataswapjs/issues/151)

## [0.12.3](https://github.com/dataswap/dataswapjs/compare/0.12.2...0.12.3) (2024-01-09)


### Bug Fixes

* 🐛 some prop is not require ([528aef5](https://github.com/dataswap/dataswapjs/commit/528aef56433cf3880ae10d92cf719b02f961d194))

## [0.12.2](https://github.com/dataswap/dataswapjs/compare/0.12.1...0.12.2) (2024-01-09)


### Bug Fixes

* 🐛 requirement unique index ([e5c23e3](https://github.com/dataswap/dataswapjs/commit/e5c23e33b75ded66591c5db64908f8efbf06acc9))

## [0.12.1](https://github.com/dataswap/dataswapjs/compare/0.12.0...0.12.1) (2024-01-09)


### Bug Fixes

* 🐛 debug decodemessage faild ([9ee258a](https://github.com/dataswap/dataswapjs/commit/9ee258a08033909014c3988adf7a7f8258760832)), closes [#147](https://github.com/dataswap/dataswapjs/issues/147)

# [0.12.0](https://github.com/dataswap/dataswapjs/compare/0.11.0...0.12.0) (2024-01-08)


### Features

* 🎸 add merge tool for matchingTarget ([781cd5a](https://github.com/dataswap/dataswapjs/commit/781cd5a1be5e7daffc4136b637aea5c7989becf9)), closes [#145](https://github.com/dataswap/dataswapjs/issues/145)

# [0.11.0](https://github.com/dataswap/dataswapjs/compare/0.10.1...0.11.0) (2024-01-08)


### Features

* 🎸 convert datasetproofs to cars ([893d815](https://github.com/dataswap/dataswapjs/commit/893d815ba99439a09d802bd98bc83c077d01ee11)), closes [#136](https://github.com/dataswap/dataswapjs/issues/136)
* 🎸 define matchingbid ([172846d](https://github.com/dataswap/dataswapjs/commit/172846d54eed3e84ff36f4f72f749e615b6cef43)), closes [#143](https://github.com/dataswap/dataswapjs/issues/143)
* 🎸 tools to convert DatasetRequirements ([ebf1695](https://github.com/dataswap/dataswapjs/commit/ebf16951a313fd7daa0b8fb37d080ec81bb5ae68)), closes [#135](https://github.com/dataswap/dataswapjs/issues/135)
* 🎸 tools to convert matching target to car replicas ([937fc1d](https://github.com/dataswap/dataswapjs/commit/937fc1de2ee0a4e25b672b27f19bf8d281d2e7bf)), closes [#137](https://github.com/dataswap/dataswapjs/issues/137)

## [0.10.1](https://github.com/dataswap/dataswapjs/compare/0.10.0...0.10.1) (2024-01-06)


### Bug Fixes

* 🐛 add carId to CarReplica ([914d356](https://github.com/dataswap/dataswapjs/commit/914d35686e5fe4cd9c6aa1dbfe46c9c71e0b0c40)), closes [#134](https://github.com/dataswap/dataswapjs/issues/134)

# [0.10.0](https://github.com/dataswap/dataswapjs/compare/0.9.0...0.10.0) (2024-01-05)


### Features

* 🎸 Add the exports for data types and datastore ([293f5ca](https://github.com/dataswap/dataswapjs/commit/293f5ca695e4a957da407448690e63ac99936fd6)), closes [#131](https://github.com/dataswap/dataswapjs/issues/131)

# [0.9.0](https://github.com/dataswap/dataswapjs/compare/0.8.0...0.9.0) (2024-01-05)


### Bug Fixes

* 🐛 ci issue ([d6f4e16](https://github.com/dataswap/dataswapjs/commit/d6f4e164ae44c94b8a685306652c2e5848880883))
* 🐛 update net version->2.5.2 ([60d0514](https://github.com/dataswap/dataswapjs/commit/60d051435c4a0eee35bbdfe86233d181205e7e95))


### Features

* 🎸 Add car and carReplica datastore ([453ef2c](https://github.com/dataswap/dataswapjs/commit/453ef2c058fd932d4b3cc28be104be08237eabee)), closes [#109](https://github.com/dataswap/dataswapjs/issues/109) [#110](https://github.com/dataswap/dataswapjs/issues/110)
* 🎸 datastore for datasets proof ([3d4f937](https://github.com/dataswap/dataswapjs/commit/3d4f937419950bb4c59fa5b5c6e00300617ff994)), closes [#126](https://github.com/dataswap/dataswapjs/issues/126)

# [0.8.0](https://github.com/dataswap/dataswapjs/compare/0.7.0...0.8.0) (2024-01-04)


### Features

* 🎸 CarReplica interface add matchingId property ([1d72741](https://github.com/dataswap/dataswapjs/commit/1d72741b67196bb43fbe32e6974fafcb1e7e37e7)), closes [#128](https://github.com/dataswap/dataswapjs/issues/128)
* 🎸 datastore for datasetsrequirement ([5845be9](https://github.com/dataswap/dataswapjs/commit/5845be9def04795affb1ccb2d1f23a07cb4c2726)), closes [#106](https://github.com/dataswap/dataswapjs/issues/106)
* 🎸 datastore for matchings target ([47cfb88](https://github.com/dataswap/dataswapjs/commit/47cfb88b1b56343d307d512edca18ea3ab2c5b3e)), closes [#107](https://github.com/dataswap/dataswapjs/issues/107)
* 🎸 datastore for matchingss metadata ([2c2a398](https://github.com/dataswap/dataswapjs/commit/2c2a398fabeb277cc9013b02423e0c545e44ca0a)), closes [#108](https://github.com/dataswap/dataswapjs/issues/108)
* 🎸 upgrade datastore to 2.0.0 ([d24b847](https://github.com/dataswap/dataswapjs/commit/d24b84792fe54440e2469ff98810db46a68514bf))

# [0.7.0](https://github.com/dataswap/dataswapjs/compare/0.6.0...0.7.0) (2024-01-04)


### Bug Fixes

* 🐛 Correct parsing issues with datasetId and matchingId ([f4f873a](https://github.com/dataswap/dataswapjs/commit/f4f873aa8f312e2c2d0d5f1463908380363235fb)), closes [#116](https://github.com/dataswap/dataswapjs/issues/116)


### Features

* 🎸 upgrade datastore to 1.0.0 ([84d458a](https://github.com/dataswap/dataswapjs/commit/84d458a138b9dd06661203b2a89d52ffc3c95e99))

# [0.6.0](https://github.com/dataswap/dataswapjs/compare/0.5.2...0.6.0) (2024-01-04)


### Bug Fixes

* 🐛 add array utils ([b723917](https://github.com/dataswap/dataswapjs/commit/b7239179b9ae8aa35a92ae30ca130c089ab50148)), closes [#103](https://github.com/dataswap/dataswapjs/issues/103)
* 🐛 Escrow decode params comparison expression ([3fdf891](https://github.com/dataswap/dataswapjs/commit/3fdf891d14dddc7fab179b0f3dbffca587402ef3)), closes [#92](https://github.com/dataswap/dataswapjs/issues/92)


### Features

* 🎸 add decode for datasets challenge proof ([2a6374e](https://github.com/dataswap/dataswapjs/commit/2a6374e1324305ec5efde838273a044ebf7a213b)), closes [#75](https://github.com/dataswap/dataswapjs/issues/75)
* 🎸 add decode for datasets proof ([565749e](https://github.com/dataswap/dataswapjs/commit/565749e9d91de0df0147217f4f111d1f0e853fca)), closes [#50](https://github.com/dataswap/dataswapjs/issues/50)
* 🎸 add decode for datasets requirement ([88a45d9](https://github.com/dataswap/dataswapjs/commit/88a45d9d2276935453c7e18c82e5cea8d764fe97)), closes [#46](https://github.com/dataswap/dataswapjs/issues/46)
* 🎸 add decode for matching bids ([f4c952b](https://github.com/dataswap/dataswapjs/commit/f4c952b205695bcfb048c6e6f288d28910920d26)), closes [#76](https://github.com/dataswap/dataswapjs/issues/76)
* 🎸 add decode for matchings metadata ([1861a22](https://github.com/dataswap/dataswapjs/commit/1861a224ace8f0ee3d6bf91da1c02d5d3f4ebd9c)), closes [#47](https://github.com/dataswap/dataswapjs/issues/47)
* 🎸 add decode for matchings target ([7b787f7](https://github.com/dataswap/dataswapjs/commit/7b787f799d5ec13d80b7fcc531568cafa5945867)), closes [#48](https://github.com/dataswap/dataswapjs/issues/48)
* 🎸 Add escrow datastore function ([3e2f41f](https://github.com/dataswap/dataswapjs/commit/3e2f41f061cb1b6e10cd18284b95723ac37601d9)), closes [#97](https://github.com/dataswap/dataswapjs/issues/97)
* 🎸 update filecoin -> 1.6.0 ([864d5d6](https://github.com/dataswap/dataswapjs/commit/864d5d6bd29930b9c56d36a329b845626f48174d))

## [0.5.2](https://github.com/dataswap/dataswapjs/compare/0.5.1...0.5.2) (2024-01-02)


### Bug Fixes

* 🐛 dataswapmessage model ([b0f9988](https://github.com/dataswap/dataswapjs/commit/b0f998806a2dd07f7bec831131e89af17df40176))

## [0.5.1](https://github.com/dataswap/dataswapjs/compare/0.5.0...0.5.1) (2024-01-02)


### Bug Fixes

* 🐛 datasetmeta datastore ([c6c823d](https://github.com/dataswap/dataswapjs/commit/c6c823d27712581f66887433bd0e34a649e26c5c))

# [0.5.0](https://github.com/dataswap/dataswapjs/compare/0.4.0...0.5.0) (2024-01-02)


### Bug Fixes

* 🐛 datasetmeta datastore issues ([dc8bbd8](https://github.com/dataswap/dataswapjs/commit/dc8bbd8732bda8b5254ce94b3f642978181579c1))


### Features

* 🎸 add test code for matchingsbids ([ffcc394](https://github.com/dataswap/dataswapjs/commit/ffcc39405253d2299be348c41d230366607ce62f)), closes [#38](https://github.com/dataswap/dataswapjs/issues/38)

# [0.4.0](https://github.com/dataswap/dataswapjs/compare/0.3.0...0.4.0) (2024-01-02)


### Bug Fixes

* 🐛 compile issues ([bc73a2a](https://github.com/dataswap/dataswapjs/commit/bc73a2acc1f46eff7c645dd42940bb9382d920c9))
* 🐛 compiles issue ([e8c535b](https://github.com/dataswap/dataswapjs/commit/e8c535b3d8cc77c04d5bd2b74416ceab36d6a4d3))


### Features

* 🎸 add get message sample when decode ([4cf1317](https://github.com/dataswap/dataswapjs/commit/4cf131782ee1ff78985cb11bba73eacd611b2aaf))
* 🎸 add test code for matchings ([6093d6f](https://github.com/dataswap/dataswapjs/commit/6093d6f00d4533b62f99292c3519a300cd49a5f6)), closes [#6](https://github.com/dataswap/dataswapjs/issues/6)
* 🎸 add test code for matchingstarget ([469f91e](https://github.com/dataswap/dataswapjs/commit/469f91ebadb802e2d53e5cf586a73ac6bcbd0d4c)), closes [#36](https://github.com/dataswap/dataswapjs/issues/36)

# [0.3.0](https://github.com/dataswap/dataswapjs/compare/0.2.0...0.3.0) (2023-12-28)


### Bug Fixes

* 🐛 [#79](https://github.com/dataswap/dataswapjs/issues/79) ([853f34e](https://github.com/dataswap/dataswapjs/commit/853f34ed9fbdb876ebbe22fb7de815d602044903))
* 🐛 datasetmeta type ([efe4deb](https://github.com/dataswap/dataswapjs/commit/efe4deb8061ba5d6b57b63fa033a36e87f1c0cf6))
* 🐛 multiformat build issues ([a40f085](https://github.com/dataswap/dataswapjs/commit/a40f08555f0af9468fd4a1ccb599b9da2eef7b65))
* 🐛 update net->v2.5.1 ([a95dc95](https://github.com/dataswap/dataswapjs/commit/a95dc95bdb7696eb89e7d6a60bcf0672716f32a2)), closes [#68](https://github.com/dataswap/dataswapjs/issues/68)


### Features

* 🎸 add datasetmeta model and decode feature ([4ad9ae3](https://github.com/dataswap/dataswapjs/commit/4ad9ae3920f1bfac57214b3ecd72b916571ca883))
* 🎸 Add filplus test case ([809261d](https://github.com/dataswap/dataswapjs/commit/809261d9c17848d812b05f39d565e7e9ef4deec0)), closes [#30](https://github.com/dataswap/dataswapjs/issues/30) [#8](https://github.com/dataswap/dataswapjs/issues/8)
* 🎸 add issues and PR specifications ([82c2447](https://github.com/dataswap/dataswapjs/commit/82c244711fa44a22c676850cf6a8337b51381d01)), closes [#51](https://github.com/dataswap/dataswapjs/issues/51)
* 🎸 add test code for datasets ([3de2a4d](https://github.com/dataswap/dataswapjs/commit/3de2a4d4ab5acd066402c52a10db41bd820f503c)), closes [#5](https://github.com/dataswap/dataswapjs/issues/5)
* 🎸 add test code for datasetschallengeproof ([e21a2ab](https://github.com/dataswap/dataswapjs/commit/e21a2aba679ce086f4c53a3e5ebf5440bf301190)), closes [#35](https://github.com/dataswap/dataswapjs/issues/35)
* 🎸 add test code for datasetsproof ([ff54acd](https://github.com/dataswap/dataswapjs/commit/ff54acd700f3dfea168eb100bde2d8851110422b)), closes [#34](https://github.com/dataswap/dataswapjs/issues/34)
* 🎸 add test code for datasetsrequirement ([628f94b](https://github.com/dataswap/dataswapjs/commit/628f94bd2c7513546b10b43028626828c8583f95)), closes [#31](https://github.com/dataswap/dataswapjs/issues/31)
* 🎸 add unimessage datstore ([b75359f](https://github.com/dataswap/dataswapjs/commit/b75359fb7eb57407a727a3798032dc4ac6bb4533)), closes [#44](https://github.com/dataswap/dataswapjs/issues/44)
* 🎸 auto generate proofs ([b7f2b87](https://github.com/dataswap/dataswapjs/commit/b7f2b873bcfc6befc9311b84be88f33e651919a2)), closes [#24](https://github.com/dataswap/dataswapjs/issues/24)
* 🎸 delete draft code ([efd6cb7](https://github.com/dataswap/dataswapjs/commit/efd6cb7a8b498f47a5ac838b05c52f197ca21a84))
* 🎸 export feature for debug ([c0f812f](https://github.com/dataswap/dataswapjs/commit/c0f812f519ce411694ee77c30978c156e09f96b8))
* 🎸 update filecoin and ddd version to v1 ([2f58c1c](https://github.com/dataswap/dataswapjs/commit/2f58c1cd69096b2c2776791a6cab72de901cd80c))
* 🎸 upgrade filecoin version ->1.5 ([a3008ea](https://github.com/dataswap/dataswapjs/commit/a3008eac23712c9847b71714641f2273540b3496))

# 0.2.0 (2023-12-26)


### Features

* Add carstore api assertion ([88bccd0](https://github.com/dataswap/dataswapjs/commit/88bccd07856f53f9c5551f0df4c421c56a98d5de))
* Add contracts module ([2fb0543](https://github.com/dataswap/dataswapjs/commit/2fb05432d50718ee367186fb897726a2d560b447))
* Add escrow test for contracts ([619a69d](https://github.com/dataswap/dataswapjs/commit/619a69de36a846283d2ea781a7701a978daae89c))
* Add Evm output error process ([1e6a632](https://github.com/dataswap/dataswapjs/commit/1e6a632483347097bc4de5dc5a34e6496f48fab9))
* Add EvmEx class to include constructor EvmEngine ([c84e5bc](https://github.com/dataswap/dataswapjs/commit/c84e5bcbf68d8e8a6c6a03c7f9eca0676cd51e7e))
* add function of module [ [#13](https://github.com/dataswap/dataswapjs/issues/13) ] ([56c6eed](https://github.com/dataswap/dataswapjs/commit/56c6eed4a096ff2e8625541b0d2b504e9226115e))
* Add localnet node for test ([7b3ef66](https://github.com/dataswap/dataswapjs/commit/7b3ef6608ac99cb054fbceede3948a6a3247112d))
* Add mocha test code ([f830aa5](https://github.com/dataswap/dataswapjs/commit/f830aa5271eff1b32aec4e60a6deb228809a45f0))
* Add nock rpc function ([22b3222](https://github.com/dataswap/dataswapjs/commit/22b322241ffec067e679c39a25896b8a8bf6f316))
* Optimize test code ([3cd0c27](https://github.com/dataswap/dataswapjs/commit/3cd0c2751283cabee6acd9568d3b2148a4f13490))
* Optimize test code ([e2512b6](https://github.com/dataswap/dataswapjs/commit/e2512b6d49611e4f80c08a31aaa1e5d7c5918fda))
