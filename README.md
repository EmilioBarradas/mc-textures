# mc-textures

Generate item and block textures from the [official Minecraft Wiki](https://minecraft.gamepedia.com/Minecraft_Wiki).

## Usage

First, you must clone and enter this directory.

```console
git clone https://github.com/EmilioBarradas/mc-textures.git
cd mc-textures
```

Next, install the required npm packages.

```console
npm i
```

### Generate Textures

The generated images will be placed in the `data/images` directory.

*Minecraft*

```console
npm run generate
```

*Spigot*

This will adhere the image names to spigot [Material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html) enum values.

```console
npm run generate_spigot
```

## Missing Textures

If the textures you are looking for are not generated, take a look at the ignored files, [here](/data/ignored_tags.json) for minecraft textures, and [here](/data/ignored_materials.json) for spigot textures. These files contain the item names of the textures which I have not imported into the project.

If the textures are in the ignored files, submit a request through the [issues page](https://github.com/EmilioBarradas/mc-textures/issues), and I will try to import them in. This repository currently only hosts Java Edition textures, so please do not submit requests for Bedrock or Pocket edition textures.

If you would like to import textures yourself, have a look at the [InvSprite page](https://minecraft.gamepedia.com/Module:InvSprite) on the official Minecraft Wiki, and search for your required textures. If they listed on the page, jump down to the [code section](https://minecraft.gamepedia.com/Module:InvSprite#the-code), and search for the items. Next, go to the generated `data/tags.json` file in your cloned repository (after running `npm run generate`), and search for the items' minecraft tags. Once you have found both the items' names in the code section and their respective minecraft tags, you now need to link the two. To do so, go to the [tag deviations file](/data/tag_deviations.json), and insert your entries in the form of `"{minecraft item tag}": "{item name in code section}"`. Save the file, and re-run `npm run generate`. The textures should now be in the `data/images/minecraft` directory.

The above process is for generating minecraft textures, but the spigot process is similar.
