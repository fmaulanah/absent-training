import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppCard from "../../components/common/Card/AppCard";
import AppButton from "../../components/common/Button/AppButton";

function Home() {

    return (

        <>

            <PageHeader

                title="Home"

                subtitle="Selamat datang di CSG Training Scheduler"

                action={

                    <AppButton>

                        Tambah

                    </AppButton>

                }

            />

            <AppCard title="Welcome">

                Dashboard masih dummy.

            </AppCard>

        </>

    );

}

export default Home;