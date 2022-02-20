import cloudinary from "cloudinary";

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "srahalh",
  api_key: "265548276411324",
  api_secret: "Repdb-n_MQLxez7Kqd5XS5s_jgI",
});

describe("Test: fileUpload.js", () => {
  test("should has upload a file and return URL", async (done) => {
    /**Forma de crear un archivo */
    const resp = await fetch(
      "https://res.cloudinary.com/srahalh/image/upload/v1645049006/v7zok8ztvhtmdpqthuaw.png"
    );
    const blob = await resp.blob();
    const file = new File([blob], "picture.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    /**Borrar imagen de cloudinary para no embasurar el cloud */
    
    const segment = url.split('/');
    const imgID = segment[segment.length - 1].replace('.png', '');

    cloudinary.v2.api.delete_resources(imgID, {}, () => {
        done(); 
    })

  });
  test("should has return error", async () => {
    /**Forma de crear un archivo */
    const file = new File([], "picture.png");

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
