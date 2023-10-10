Title: Multicellular reservoir computing
Date: 2023-05-10
ModDate: 2023-09-08
Tags: bioinformatics, simulation, networks, signal-processing

<a target="_blank" href="https://doi.org/10.1371/journal.pone.0282122">Multicellular reservoir computing</a> is a simulation I've done of an arbitrary population of cells in order to analyze its computational capacity.

In the simulation space, there is an input signal which is represented as a varying source of a molecule concentration. The population of cells is able to register the presence of the input molecule above a certain threshold, allowing for a binary interpretation of the signal. Given the binary signal and a time window, we can test whether the population can calculate a bunch of boolean functions. E.g. the median function on a window of an odd number of bits determines whether there's more ones or zeros in the window. Another tested function is parity, which tells us whether there's an even or odd number of ones in the window.

Throughout the simulation, the input signal comes from one face of the simulation space, varying between low and high levels and stimulating the cell community. Cells are spatially arranged in square layers along the input signal source axis. The cells that receive the signal communicate with other cells using extracellular signaling molecules (ESMs) and propagate the information to further layers. A number of cells on the other side are used as output, and LASSO regression is trained on their gene values.

<p align="center">
  <img src="/static/images/multicell-rc/cell_layers.png" width="75%"/>
</p>

Each cell simulates gene regulation with a random boolean network. The number of cell strains can be specified, where every strain has its own boolean network topology and every cell is assigned a random strain. Every cell has a randomized initial state for all of its genes:

<p align="center">
  <img src="/static/images/multicell-rc/gene_network.png" width="70%"/>
</p>

Within the boolean network, the first gene (0_0) is reserved for the input signal value, received from the environment. The following N genes are reserved for ESMs input, one gene for each of N ESMs. These genes switch on when the environment ESM level is above the specified threshold. Another N genes are reserved after that for ESM output, secreting the ESM if the gene is switched on. The rest of the genes comprise the internal genes of the cell, implementing the logic of the boolean network. Genes are randomly wired, with the condition that the input genes can only be read from and that the ESM output genes can only be written to.

<br/>
<br/>
<div class="citation">
Nikolić, V., Echlin, M., Aguilar, B., & Shmulevich, I. (2023). Computational capabilities of a multicellular reservoir computing system. In C. Zandron (Ed.), PLOS ONE (Vol. 18, Issue 4, p. e0282122). Public Library of Science (PLoS). <a target="_blank" href="https://doi.org/10.1371/journal.pone.0282122">https://doi.org/10.1371/journal.pone.0282122</a>
</div>
