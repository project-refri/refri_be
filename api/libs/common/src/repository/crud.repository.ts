export interface ICrudRepository<Entity, CreateDto, UpdateDto, FilterDto> {
  create(createDto: CreateDto): Promise<Entity>;
  findAll(filterDto: FilterDto): Promise<Entity[]>;
  findOne(id: string | number): Promise<Entity>;
  update(id: string | number, updateDto: UpdateDto): Promise<Entity>;
  deleteOne(id: string | number): Promise<Entity>;
}
