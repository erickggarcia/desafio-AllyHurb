import React, { useState, useEffect } from "react"
import styled from "styled-components";
import InputMask from "react-input-mask";
import Field from "./components/field";
import Label from "./components/label";
import Title from "./components/title";
import Button from "./components/button";
import CustomSelect from "./components/select";

const URL_COUNTRY = "https://amazon-api.sellead.com/country";
const URL_STATE = "https://amazon-api.sellead.com/city";

const Section = styled.section`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  margin: 20px;
  width: 400px;
`

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.aside`
  display: flex;
  justify-content: center;
`

const INITIAL_VALUE = {
  name: "",
  email: "",
  tel: "",
  cpf: ""
}

function App() {
  const [cities, setCities] = useState([])
  const [citiesFiltered, setCitiesFiltered] = useState([])
  const [countries, setCountries] = useState([])
  const [selectedState, setSelectedState] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [formData, setFormData] = useState(INITIAL_VALUE)

  useEffect(() => {
    async function fetchDataState() {
      const data = await fetch(URL_STATE,{
          headers:{
              "git-user": "erickggarcia"
          }
      })
      .then(data => data.json())

      const newData = data.map(state => ({ value: state.name_ptbr }))
      setCities(newData)
    }

    async function fetchDataCountry() {
      const data = await fetch(URL_COUNTRY,{
          headers:{
            "git-user": "erickggarcia"
          }
        }).then(data => data.json())

        const newData = data.map(country => ({ value: country.name_ptbr }))
        setCountries(newData)
        setCitiesFiltered(newData)
      }

      fetchDataState()
      fetchDataCountry()
    }, [])


  function onChangeCountry(currentCountries) {
    if (currentCountries.length === 0) {
      setSelectedState([])
      setSelectedCountry([])
      setCitiesFiltered([])
      return
    }

    setSelectedCountry(currentCountries)

    const currentCountriesMap = currentCountries.map(country => country.value)

    // eslint-disable-next-line array-callback-return
    const currentCities = cities.filter((city) => {
      const sanitizedCity = city.value?.replace('-', ',')
      const splitedCityValue = sanitizedCity?.split(',')

      if (!splitedCityValue) {
        return null
      }

      const cityCountry = splitedCityValue[splitedCityValue?.length - 1].trim()

      if (currentCountriesMap.includes(cityCountry)) {
        return city
      }
    })
    setCitiesFiltered(currentCities)
  }

  function onChangeInput(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    console.log('formData :>> ', formData);
  }

  function showSaveMsg() {
    const isAnyInputEmpty = Object.values(formData).some(input => input === "")
    if (isAnyInputEmpty) {
      return alert("Por favor preencha todos os campos")
    }

    alert(`
           Nome: ${formData.name},
           Email: ${formData.email}
           Tel: ${formData.tel}
           CPF: ${formData.cpf}
          `)
  }

  return (
    <>
      <Wrapper>
        <Section>
          <Title text="Dados Pessoais" />

          <Label text="Nome"  />
          <Field type="text" name="name" onChange={(e) => onChangeInput(e)} />

          <Label text="Email"  />
          <Field type="email" name="email" onChange={(e) => onChangeInput(e)} />

          <Label text="Telefone"  />
          <InputMask name="tel" mask="(99) 9 9999-9999" onChange={(e) => onChangeInput(e)} required />

          <Label text="CPF"  />
          <InputMask name="cpf" mask="999.999.999-99" onChange={(e) => onChangeInput(e)} required />
        </Section>

        <Section>
          <Title text="Destinos de Interesse" />

          <Label text="País" />
          <CustomSelect
            options={countries}
            onChange={(e) => onChangeCountry(e)}
            value={selectedCountry}
            />

          <Label text="Estado" />
          <CustomSelect
            options={citiesFiltered}
            onChange={setSelectedState}
            value={selectedState}
            />
        </Section>
      </Wrapper>
      <ButtonWrapper>
        <Button text="Salvar" onClick={() => showSaveMsg()} />
      </ButtonWrapper>
    </>
  );
}

export default App;
