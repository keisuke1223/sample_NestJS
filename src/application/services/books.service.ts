import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Book } from 'domain/entities/book.entity'
import { NewBookInput } from 'application/input/book/newBook.input'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepostiory: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepostiory.find()
  }

  findOneById(id: number): Promise<Book> {
    return this.booksRepostiory.findOne(id)
  }

  async create(data: NewBookInput): Promise<Book> {
    const book = this.booksRepostiory.create(data)
    await this.booksRepostiory.save(book)
    return book
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepostiory.delete(id)
    return result.affected > 0
  }
}
