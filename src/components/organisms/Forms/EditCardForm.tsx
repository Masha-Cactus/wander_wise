'use client';

import { useEffect, useMemo, useState } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useUpdateCard } from "@/src/queries";
import { 
  ClimateType, 
  ICard, 
  SpecialRequirementsType, 
  TripTypesType 
} from "@/src/services";
import { Divider, ErrorText, Heading5, Icons } from "@/src/components/atoms";
import { 
  DropdownInput, 
  LocationInput, 
  ListInput, 
  TextAreaInput, 
  TextInput,
  RadioButtonInput,
  PrimaryButton,
  CheckboxInput,
  IconButton
} from "@/src/components/molecules";
import { updateCardSchema } from "@/src/validation";
import { ATMOSPHERES, CLIMATES, SPECIALS } from "@/src/lib/cardParameters";
import { Routes } from "@/src/lib/constants";

interface EditCardFormProps {
  card: ICard,
}

export interface UpdateCardFormData {
  name: string,
  location: RadarAutocompleteAddress | null,
  tripTypes: TripTypesType[],
  climate: ClimateType,
  specialRequirements: SpecialRequirementsType[],
  description: string,
  whyThisPlace: string[],
  imageLinks: string[],
  mapLink: string,
}

const EditCardForm: React.FC<EditCardFormProps> = ({ card }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { push } = useRouter();

  const validationSchema = updateCardSchema();
  const defaultValues = useMemo(() => ({
    name: card?.name,
    location: null,
    tripTypes: card?.tripTypes,
    climate: card?.climate,
    specialRequirements: card?.specialRequirements,
    description: card?.description,
    whyThisPlace: card?.whyThisPlace,
    imageLinks: card?.imageLinks,
    mapLink: card?.mapLink,
  }), [card]);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateCardFormData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useUpdateCard();
  
  const onSubmit: SubmitHandler<UpdateCardFormData> = (data) => {
    const {
      location, 
      ...trimmedData
    } = trimObjectFields(data);

    const [populatedLocality, region, country, continent] 
    = card.whereIs.split(',');
    
    mutate({
      ...trimmedData,
      id: card.id,
      populatedLocality: location?.city || populatedLocality.trim(),
      region: location ? '' : region.trim(),
      country: location?.country || country.trim(),
      continent: location ? '' : continent.trim(),
    },
    {
      onError: (e) => setErrorMessage(e),
      onSuccess: () => push(Routes.MY_CARDS.MAIN),
    }
    );
  };

  const [selectedImage, setSelectedImage] = useState('');
  const currentImageLinks = watch('imageLinks');

  const handleDelete = (image: string) => {
    const updatedImageLinks = currentImageLinks.filter(img => img !== image);

    if (selectedImage === image) {
      setSelectedImage(updatedImageLinks[0]);
    }

    setValue('imageLinks', updatedImageLinks);
  };

  useEffect(() => {
    setValue('imageLinks', card.imageLinks);
  }, [card, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      {!!currentImageLinks.length && (
        <>
          <Heading5 text="Photos you added" font="medium" />
          <div className="flex h-64 w-full justify-between gap-2">
            <div className="group relative h-full grow">
              <Image
                src={selectedImage ? selectedImage : currentImageLinks[0]}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="cursor-pointer rounded-2xl object-cover"
                alt="Card image"
              />
              <IconButton 
                icon={<Icons.delete />} 
                classes="absolute top-3 right-3 rounded-full w-8 h-8 
                border border-white bg-error hidden text-white 
                group-hover:flex group-hover:cursor-pointer"
                onClick={() => handleDelete(selectedImage)}
              />
            </div>
            <div className="flex h-full w-40 
            shrink-0 flex-col gap-2 overflow-y-scroll">
              {currentImageLinks.map(image => (
                <div key={image} className="relative h-28 w-full shrink-0">
                  <Image
                    src={image}
                    fill
                    sizes="160px"
                    className="cursor-pointer rounded-2xl object-cover"
                    alt="Card image"
                    onClick={() => setSelectedImage(image)}
                  />
                </div>
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

      <TextInput
        type="text"
        name="mapLink"
        control={control}
        errorText={errors.mapLink?.message}
        disabled={isPending}
        placeholder="Enter a valid Google Maps link"
        label="Google Maps link"
      />

      <TextAreaInput
        name="description"
        control={control}
        errorText={errors.description?.message}
        disabled={isPending}
        placeholder="Write something about this place"
        label="Description"
      />

      <ListInput
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

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <Heading5 text="Special" font="medium" />
          <Divider />
          <div className="flex flex-col gap-2">
            {SPECIALS.map((special) => (
              <CheckboxInput
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
        <div className="flex flex-col gap-4">
          <Heading5 text="Climate" font="medium" />
          <Divider />
          <div className="flex flex-col gap-2">
            {CLIMATES.map((climate) => (
              <RadioButtonInput
                key={climate}
                control={control}
                name="climate"
                value={climate}
                text={climate}
              />
            ))}

            {errors.climate?.message && (
              <ErrorText errorText={errors.climate.message} />
            )}
          </div>
        </div>
      </div>

      <PrimaryButton text="Save changes" type="submit" disabled={isPending} />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default EditCardForm;