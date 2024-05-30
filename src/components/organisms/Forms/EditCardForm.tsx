'use client';

import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useGetCardDetails, useUpdateCard } from "@/src/queries";
import { 
  ClimateType, 
  SpecialRequirementsType, 
  TripTypesType 
} from "@/src/services";
import { useForm } from "react-hook-form";
import { Divider, ErrorText, Heading5, Icons } from "@/src/components/atoms";
import { 
  DropdownInput, 
  LocationInput, 
  SelectInput, 
  TextAreaInput, 
  TextInput,
  CheckboxInput,
  PrimaryButton,
  SquareCheckboxInput,
  IconButton
} from "@/src/components/moleculs";
import { updateCardSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { ATMOSPHERES, CLIMATES, Routes, SPECIALS } from "@/src/lib/constants";

export interface UpdateCardFormData {
  name: string,
  location: RadarAutocompleteAddress | null,
  tripTypes: TripTypesType[],
  climate: ClimateType,
  specialRequirements: SpecialRequirementsType[],
  description: string,
  whyThisPlace: string[],
  imageLinks: string[],
}

const EditCardForm = () => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { push } = useRouter();
  const { id } = useParams();

  const { data: card, error: cardError } = useGetCardDetails(+id);

  const validationSchema = updateCardSchema();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateCardFormData>({
    defaultValues: {
      name: card?.name,
      location: null,
      tripTypes: card?.tripTypes,
      climate: card?.climate,
      specialRequirements: card?.specialRequirements,
      description: card?.description,
      whyThisPlace: card?.whyThisPlace,
      imageLinks: card?.imageLinks,
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useUpdateCard();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };
  
  const onSubmit = async (data: UpdateCardFormData) => {
    const {
      location, 
      ...trimmedData
    } = trimObjectFields(data);
    
    if (id) {
      mutate({
        ...trimmedData,
        id: +id,
        populatedLocality: location?.city || '',
        country: location?.country || '',
        mapLink: `https://www.google.com/maps/search/?api=1&query=${location?.latitude},${location?.longitude}`,
      },
      {
        onError: handleError,
        onSuccess: () => push(Routes.MY_CARDS.MAIN),
      }
      );
    }
  };

  const [selectedImage, setSelectedImage] = useState('');
  const currentImageLinks = watch('imageLinks');

  const handleDelete = (image: string) => {
    if (selectedImage === image) {
      setSelectedImage(currentImageLinks[0]);
    }

    setValue('imageLinks', 
      currentImageLinks.filter(img => img !== image));
  };

  if (cardError) {
    return (<ErrorText errorText={cardError.message} />);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      {!!currentImageLinks.length && (
        <>
          <Heading5 text="Photos you added" font="medium" />
          <div className="flex gap-2 w-full h-64 justify-between">
            <div className="relative group grow h-full">
              <Image
                src={selectedImage ? selectedImage : currentImageLinks[0]}
                width={0}
                height={0}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '15px', 
                }}
                alt="Card image"
              />
              <IconButton 
                icon={<Icons.delete />} 
                classes="absolute top-3 right-3 rounded-full w-8 h-8 
                border border-white bg-error hidden text-white 
                group-hover:block group-hover:cursor-pointer"
                onClick={() => handleDelete(selectedImage)}
              />
            </div>
            <div className="relative w-40 h-full shrink-0 
        flex flex-col gap-2 overflow-y-scroll">
              {currentImageLinks.map(image => (
                <Image
                  key={image}
                  src={image}
                  width={0}
                  height={0}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '15px',
                    cursor: 'pointer', 
                  }}
                  alt="Card image"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
        </>
      )}
      
      <TextInput
        type="text"
        name="name"
        control={control}
        errorText={errors.name?.message}
        disabled={isPending}
        placeholder="Cool and awesome place"
        label="Name of the place"
      />

      <LocationInput 
        placeholder="City, region, country, continent"
        label="Location"
        name="location"
        control={control}
        disabled={isPending}
        defaultLocation={card?.whereIs}
        errorText={errors.location?.message}
      />

      <TextAreaInput
        name="description"
        control={control}
        errorText={errors.description?.message}
        disabled={isPending}
        placeholder="Write something about this place"
        label="Description"
      />

      <SelectInput
        name="whyThisPlace"
        control={control}
        errorText={errors.whyThisPlace?.message}
        disabled={isPending}
        placeholder="Describe why"
        label="Why should people visit this place?"
      />

      <DropdownInput
        options={ATMOSPHERES}
        name="tripTypes"
        errorText={errors.tripTypes?.message}
        control={control}
        placeholder="Select the type of this place"
        label="Type of this place" 
      />

      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-4 grow">
          <Heading5 text="Special" font="medium" />
          <Divider classes="w-full h-px" />
          <div className="flex flex-col gap-2">
            {SPECIALS.map((special) => (
              <SquareCheckboxInput
                key={special}
                control={control}
                name="specialRequirements"
                value={special}
                text={special}
              />
            ))}

            {errors.specialRequirements?.message && (
              <ErrorText errorText={errors.specialRequirements.message} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 grow">
          <Heading5 text="Climate" font="medium" />
          <Divider classes="w-full h-px" />
          <div className="flex flex-col gap-2">
            {CLIMATES.map((climate) => (
              <CheckboxInput
                key={climate}
                control={control}
                name="climate"
                value={climate}
                text={climate}
                radio={true}
              />
            ))}

            {errors.climate?.message && (
              <ErrorText errorText={errors.climate.message} />
            )}
          </div>
        </div>
      </div>

      <PrimaryButton text="Save changes" type="submit" disabled={isPending} />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default EditCardForm;