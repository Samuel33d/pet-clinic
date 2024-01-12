import app from "./app.js";
import { initModel } from "./config/database/association.js";
import { authenticated, syncUp } from "./config/database/database.js";
import { envs } from "./config/enviroments/enviroments.js";

const main = async () => {
    try {
        await authenticated();
        initModel();
        await syncUp();
    } catch (error) {
        console.log(error)
    }
}

main();

app.listen(envs.PORT, () => console.log(`Server running on PORT: ${envs.PORT}`))