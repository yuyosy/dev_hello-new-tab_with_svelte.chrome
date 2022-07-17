<script lang="ts">
    
    import { manifest } from "./manifest";

    let options = {
        debug: false
    };
</script>

<div class="page-container" id="container">
    <div class="card">
        <div class="card-head">Options</div>
        <div class="section-group-title">Test</div>
        <div class="section hr">
            <div class="section-title">テスト</div>
            <div class="section-content">testtestテスト</div>
        </div>
        <div class="toggle-section hr">
            <span class="toggle-section-content">エラーを収集する{options.debug}</span>
            <div class="toggle" class:toggle-on={options.debug} on:click={()=>{options.debug = !options.debug; console.log(options);}} />
        </div>
    </div>
</div>

<style>
    .page-container {
        height: 100%;
        overflow: overlay;
    }
    .card {
        min-width: 30rem;
        padding: 1rem 1.4rem;
        overflow: hidden;
        margin: 1rem 10%;
        flex: 0 1 45rem;
        font-size: 0.84rem;
        word-wrap: break-word;
        color: #345;
        background-color: #fff;
        box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 2px 6px 2px;
        border-radius: 1.1rem;
    }
    .card-head {
        font-size: 1.46rem;
        font-weight: bold;
        padding: 1rem 0;
    }
    .section {
        padding: 1rem 0;
    }
    .section-group-title {
        font-size: 1.04rem;
        font-weight: bold;
        padding: 0.6rem 0;
    }
    .section-content {
        color: rgb(95, 99, 104);
    }
    .hr {
        border-top: 0.01rem solid rgba(0, 0, 0, 0.12);
    }
    .toggle-section {
        box-sizing: border-box;
        padding: 1rem 0;

        align-items: center;
        display: flex;
    }
    .toggle-section-content {
        flex: 1;
    }
    .toggle {
        height: 0.7rem;
        width: 3rem;
        margin: 0.3rem 1rem;
        display: inline-block;
        cursor: pointer;
        background-color: #ccc;
        border-radius: 3rem;
        transition: 0.4s;
    }
    .toggle:after {
        top: -0.3rem;
        left: 0rem;
        height: 1.3rem;
        width: 1.3rem;
        position: relative;
        z-index: 1;
        display: inline-block;
        content: "";
        background-color: #eceff1;
        box-shadow: 0 0 0.2rem rgb(0 0 0 / 35%);
        border-radius: 50%;
        transition: 0.3s;
    }
    .toggle-on {
        background-color: #bbdefb;
    }
    .toggle-on:after {
        left: 1.7rem;
        background-color: #42a5f5;
    }
</style>
